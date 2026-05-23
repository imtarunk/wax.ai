import { Queue } from "bullmq";
import Redis from "ioredis";

const getRedisConnection = () => {
  if (!process.env.REDIS_URL) {
    console.warn("REDIS_URL not set - background jobs disabled");
    return null;
  }
  return new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null,
  });
};

let tokenRefreshQueue: Queue | null = null;

export function getTokenRefreshQueue(): Queue | null {
  if (!tokenRefreshQueue) {
    const connection = getRedisConnection();
    if (!connection) return null;
    tokenRefreshQueue = new Queue("token-refresh", {
      connection,
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 5000,
        },
        removeOnComplete: 100,
        removeOnFail: 50,
      },
    });
  }
  return tokenRefreshQueue;
}

export async function scheduleTokenRefresh(accountId: string): Promise<void> {
  const queue = getTokenRefreshQueue();
  if (!queue) return;

  await queue.add(
    "refresh-token",
    { accountId },
    {
      jobId: `refresh-${accountId}`,
      delay: 0,
    }
  );
}

export async function schedulePeriodicTokenCheck(): Promise<void> {
  const queue = getTokenRefreshQueue();
  if (!queue) return;

  await queue.add(
    "check-expiring-tokens",
    {},
    {
      jobId: "periodic-token-check",
      repeat: {
        every: 60 * 60 * 1000, // every hour
      },
    }
  );
}
