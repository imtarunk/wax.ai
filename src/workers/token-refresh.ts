import { Worker, Job } from "bullmq";
import Redis from "ioredis";
import { db } from "@/db";
import { connectedAccounts } from "@/db/schema";
import { eq, lte, and } from "drizzle-orm";
import { encryptToken, decryptToken } from "@/lib/crypto";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

console.log("Initializing Token Refresh Background Worker...");

const connection = new Redis(REDIS_URL, {
  maxRetriesPerRequest: null,
});

const worker = new Worker(
  "token-refresh",
  async (job: Job) => {
    console.log(`[Worker] Running background job: ${job.name} (ID: ${job.id})`);

    if (job.name === "refresh-token") {
      const { accountId } = job.data;
      await refreshIndividualAccountToken(accountId);
    } else if (job.name === "check-expiring-tokens") {
      await checkAndQueueExpiringTokens();
    }
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log(`[Worker] Job ${job.id} completed successfully.`);
});

worker.on("failed", (job, err) => {
  console.error(`[Worker] Job ${job?.id} failed with error:`, err);
});

async function refreshIndividualAccountToken(accountId: string) {
  try {
    const account = await db.query.connectedAccounts.findFirst({
      where: eq(connectedAccounts.id, accountId),
    });

    if (!account) {
      console.log(`[Worker] Account ${accountId} not found in database.`);
      return;
    }

    const decryptedRefresh = decryptToken(account.refreshTokenEnc);
    console.log(
      `[Worker] Refreshing token for ${account.platform} account: ${account.username}...`
    );

    // Call platform OAuth endpoints (mock simulated response)
    const newAccessToken = `refreshed-access-token-${account.platform}-${Date.now()}`;
    const newRefreshToken = `refreshed-refresh-token-${account.platform}-${Date.now()}`;
    
    // Extend expiry by 5 days (120 hours)
    const newExpiresAt = new Date();
    newExpiresAt.setDate(newExpiresAt.getDate() + 5);

    await db
      .update(connectedAccounts)
      .set({
        accessTokenEnc: encryptToken(newAccessToken),
        refreshTokenEnc: encryptToken(newRefreshToken),
        tokenExpiresAt: newExpiresAt,
        status: "connected",
        lastSyncedAt: new Date(),
      })
      .where(eq(connectedAccounts.id, accountId));

    console.log(
      `[Worker] Successfully refreshed token for ${account.platform} (${account.username}).`
    );
  } catch (error) {
    console.error(`[Worker] Failed to refresh token for account ${accountId}:`, error);
    throw error;
  }
}

async function checkAndQueueExpiringTokens() {
  try {
    // Check all accounts expiring in the next 48 hours
    const fortyEightHoursFromNow = new Date();
    fortyEightHoursFromNow.setHours(fortyEightHoursFromNow.getHours() + 48);

    const expiringSoonAccounts = await db.query.connectedAccounts.findMany({
      where: and(
        lte(connectedAccounts.tokenExpiresAt, fortyEightHoursFromNow),
        eq(connectedAccounts.status, "connected")
      ),
    });

    console.log(
      `[Worker] Found ${expiringSoonAccounts.length} accounts expiring in the next 48 hours.`
    );

    for (const account of expiringSoonAccounts) {
      // Mark as expiring_soon so the UI prompts re-authentication
      await db
        .update(connectedAccounts)
        .set({ status: "expiring_soon" })
        .where(eq(connectedAccounts.id, account.id));

      console.log(
        `[Worker] Scheduled silent refresh or prompt for expiring account: ${account.platform} (${account.username})`
      );
    }
  } catch (error) {
    console.error("[Worker] Error checking expiring tokens:", error);
  }
}
