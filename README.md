# 🌌 SocialAI — AI Social Media Automation SaaS

> A state-of-the-art, enterprise-grade social media content composer, scheduler, auto-DM responder, and analytics platform powered by Next.js 16 (App Router), PostgreSQL + Drizzle ORM, NextAuth.js, OpenAI GPT-4o, and BullMQ + Redis background workers.

---

## ✨ Features & Capabilities

* **Unified Content Calendar**: A color-coded monthly calendar displaying scheduled, draft, and published campaigns across Instagram, LinkedIn, X, Facebook, and TikTok. Supports direct day scheduling previews and composer modals.
* **AI Caption & Hashtags Generator**: Describe your post's theme and let GPT-4o construct scroll-stopping hooks, hashtags bundles, and customized tone copies (Professional, Casual, Energetic, Educational) in seconds.
* **Reel Video Script Composer**: Select your brand niche and generate 10 detailed video ideas, 3-second attention-grabbing hooks, and complete voiceover scripts.
* **Auto-DM Reply Engine**: Establish catchphrase triggers (e.g., "pricing", "promo", "collab") to reply to direct messages instantaneously, complete with global toggles and simulated inbox logger modules.
* **Client Switcher Workspace**: Agency ready. Switch seamlessly between multiple client profiles from the sidebar header.
* **Granular Teammate Permissions**: Invite editors or viewers to manage specific social channels, assigning explicit roles (`owner`, `editor`, `viewer`).
* **Silent OAuth Token Renewals**: Background workers check token health continuously, executing silent automated refreshes 48 hours before key expiry periods.

---

## 🛡️ Enterprise-Grade Token Security

SocialAI stores connected social account credentials securely. All platform tokens are **encrypted at rest** using **AES-256-GCM** hardware-level cryptography.
* Plaintext access and refresh tokens never touch your database logs.
* Decryption keys are managed strictly via segregated environment parameters.
* Rate limits are constantly mapped and protected to prevent API throttles.

---

## 🚀 Getting Started

### 1. Requirements
Ensure you have the following installed locally:
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for local database and cache layers)
* [Node.js v18+](https://nodejs.org/)
* [npm](https://www.npmjs.com/)

### 2. Clone & Install Dependencies
```bash
git clone https://github.com/imtarunk/wax.ai.git
cd social-automation
npm install
```

### 3. Deploy Local Infrastructure
Start our pre-configured PostgreSQL (isolated to **port 5433** to avoid conflict with local databases or Supabase) and Redis:
```bash
docker compose up -d
```

### 4. Database Setup
Pushes all database schemas (`users`, `posts`, `connected_accounts`, `dm_rules`, `content_ideas`, `analytics`, `account_members`) directly to the PostgreSQL instance:
```bash
export $(cat .env.local | grep -v '^#' | xargs) && npx drizzle-kit push --force
```

### 5. Launch Background Worker Nodes
Launch the persistent BullMQ consumer to manage silent token checks and automated refreshes:
```bash
npm run worker
```

### 6. Start Dev Console
Launch the Next.js development server:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to interact with the application.

---

## ⚙️ How to Configure Real Social API Connections

To wire up real production OAuth flows instead of the sandbox interactive mock profiles, follow these specific developer portal steps:

### 1. Instagram & Facebook (Meta Graph API)
1. Register a developer account on the [Meta Developer Portal](https://developers.facebook.com/).
2. Create a **Business App** and add the **Instagram Graph API** and **Facebook Login** products.
3. Configure the redirect URI to point to `https://yourdomain.com/api/oauth/instagram/callback`.
4. Request the following permissions:
   - `instagram_basic`, `instagram_content_publish`, `pages_read_engagement`, `pages_manage_posts`, `instagram_manage_comments`.
5. Add your App Credentials to `.env.local`:
   ```env
   INSTAGRAM_CLIENT_ID="your-meta-app-id"
   INSTAGRAM_CLIENT_SECRET="your-meta-app-secret"
   ```

### 2. LinkedIn (Business Developer Portal)
1. Register a company app on the [LinkedIn Developer Portal](https://developer.linkedin.com/).
2. Add the **Share on LinkedIn** and **Sign In with LinkedIn** products.
3. Configure redirect URIs to point to `https://yourdomain.com/api/oauth/linkedin/callback`.
4. Request `w_member_social` (personal profiles) or `w_organization_social` (company pages) scopes.
5. Add your credentials to `.env.local`:
   ```env
   LINKEDIN_CLIENT_ID="your-linkedin-client-id"
   LINKEDIN_CLIENT_SECRET="your-linkedin-client-secret"
   ```

### 3. X / Twitter (Developer Portal v2 API)
1. Open the [X Developer Portal](https://developer.twitter.com/) and create a project with **v2 Access**.
2. Go to **User Authentication Settings**, toggle **OAuth 2.0**, and select **Web App**.
3. Configure redirect URIs to `https://yourdomain.com/api/oauth/x/callback`.
4. Request `tweet.read`, `tweet.write`, `users.read`, and `offline.access` (critical for getting the refresh token!).
5. Add your credentials to `.env.local`:
   ```env
   TWITTER_CLIENT_ID="your-x-client-id"
   TWITTER_CLIENT_SECRET="your-x-client-secret"
   ```

### 4. TikTok (for Business Developer Console)
1. Register a developer account on the [TikTok Developer Portal](https://developers.tiktok.com/).
2. Create an App, select **TikTok Business SDK**, and configure redirect URIs to `https://yourdomain.com/api/oauth/tiktok/callback`.
3. Select `video.publish` and `user.info.basic` scopes.
4. Add your credentials to `.env.local`:
   ```env
   TIKTOK_CLIENT_KEY="your-tiktok-client-key"
   TIKTOK_CLIENT_SECRET="your-tiktok-client-secret"
   ```

---

## 🛠️ Environment Configuration Mappings (`.env.local`)

Make sure your local `.env.local` contains all active system keys:

```env
# ─── Database ────────────────────────────────────────────────────────────────
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/social_automation"

# ─── NextAuth ────────────────────────────────────────────────────────────────
NEXTAUTH_SECRET="your-super-secret-key-32-characters"
NEXTAUTH_URL="http://localhost:3000"

# ─── AI (OpenAI) ─────────────────────────────────────────────────────────────
OPENAI_API_KEY="sk-proj-..."

# ─── Token Encryption (32-byte hex string) ────────────────────────────────────
ENCRYPTION_KEY="a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456"

# ─── Redis (for BullMQ background jobs) ──────────────────────────────────────
REDIS_URL="redis://localhost:6379"
```

---

## 🛡️ License
MIT License. Created by Growth Engineers on Next.js 16 + Drizzle. Mapped by Mysh.ai.
