import {
  pgTable,
  text,
  timestamp,
  uuid,
  pgEnum,
  integer,
  boolean,
  jsonb,
  varchar,
  real,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ─── Enums ────────────────────────────────────────────────────────────────────

export const planEnum = pgEnum("plan", ["creator", "team", "agency"]);
export const postStatusEnum = pgEnum("post_status", [
  "draft",
  "scheduled",
  "published",
  "failed",
]);
export const platformEnum = pgEnum("platform", [
  "instagram",
  "linkedin",
  "x",
  "facebook",
  "tiktok",
]);
export const accountStatusEnum = pgEnum("account_status", [
  "connected",
  "disconnected",
  "token_expired",
  "expiring_soon",
]);
export const memberRoleEnum = pgEnum("member_role", [
  "owner",
  "editor",
  "viewer",
]);
export const nicheEnum = pgEnum("niche", [
  "fitness",
  "food",
  "fashion",
  "tech",
  "travel",
  "business",
  "beauty",
  "education",
  "entertainment",
  "lifestyle",
]);

// ─── Users ────────────────────────────────────────────────────────────────────

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  plan: planEnum("plan").notNull().default("creator"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── NextAuth Tables ──────────────────────────────────────────────────────────

export const accounts = pgTable("accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("provider_account_id").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
});

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionToken: text("session_token").notNull().unique(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable("verification_tokens", {
  identifier: text("identifier").notNull(),
  token: text("token").notNull().unique(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

// ─── Posts ────────────────────────────────────────────────────────────────────

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  caption: text("caption"),
  mediaUrls: jsonb("media_urls").$type<string[]>().default([]),
  platforms: jsonb("platforms").$type<string[]>().notNull().default([]),
  scheduledAt: timestamp("scheduled_at", { mode: "date" }),
  status: postStatusEnum("status").notNull().default("draft"),
  hook: text("hook"),
  hashtags: text("hashtags"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── DM Rules ─────────────────────────────────────────────────────────────────

export const dmRules = pgTable("dm_rules", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  keyword: text("keyword").notNull(),
  replyTemplate: text("reply_template").notNull(),
  platform: platformEnum("platform").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── Content Ideas ────────────────────────────────────────────────────────────

export const contentIdeas = pgTable("content_ideas", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  niche: nicheEnum("niche").notNull(),
  ideaText: text("idea_text").notNull(),
  hook: text("hook"),
  script: text("script"),
  isSaved: boolean("is_saved").notNull().default(false),
  savedAt: timestamp("saved_at", { mode: "date" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── Analytics ────────────────────────────────────────────────────────────────

export const analytics = pgTable("analytics", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  platform: platformEnum("platform").notNull(),
  date: timestamp("date", { mode: "date" }).notNull(),
  followers: integer("followers").notNull().default(0),
  reach: integer("reach").notNull().default(0),
  engagementRate: real("engagement_rate").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── Connected Accounts ───────────────────────────────────────────────────────

export const connectedAccounts = pgTable("connected_accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  platform: platformEnum("platform").notNull(),
  username: text("username").notNull(),
  avatarUrl: text("avatar_url"),
  accessTokenEnc: text("access_token_enc"),
  refreshTokenEnc: text("refresh_token_enc"),
  tokenExpiresAt: timestamp("token_expires_at", { mode: "date" }),
  followerCount: integer("follower_count").notNull().default(0),
  status: accountStatusEnum("status").notNull().default("disconnected"),
  label: text("label"),
  colorTag: varchar("color_tag", { length: 7 }),
  lastSyncedAt: timestamp("last_synced_at", { mode: "date" }),
  rateLimitUsed: integer("rate_limit_used").notNull().default(0),
  rateLimitMax: integer("rate_limit_max").notNull().default(200),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── Account Members ──────────────────────────────────────────────────────────

export const accountMembers = pgTable("account_members", {
  id: uuid("id").primaryKey().defaultRandom(),
  accountId: uuid("account_id")
    .notNull()
    .references(() => connectedAccounts.id, { onDelete: "cascade" }),
  memberEmail: text("member_email").notNull(),
  role: memberRoleEnum("role").notNull().default("viewer"),
  invitedAt: timestamp("invited_at", { mode: "date" }).notNull().defaultNow(),
  acceptedAt: timestamp("accepted_at", { mode: "date" }),
});

// ─── Relations ────────────────────────────────────────────────────────────────

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  dmRules: many(dmRules),
  contentIdeas: many(contentIdeas),
  analytics: many(analytics),
  connectedAccounts: many(connectedAccounts),
}));

export const connectedAccountsRelations = relations(
  connectedAccounts,
  ({ one, many }) => ({
    user: one(users, {
      fields: [connectedAccounts.userId],
      references: [users.id],
    }),
    members: many(accountMembers),
  })
);

export const accountMembersRelations = relations(accountMembers, ({ one }) => ({
  account: one(connectedAccounts, {
    fields: [accountMembers.accountId],
    references: [connectedAccounts.id],
  }),
}));
