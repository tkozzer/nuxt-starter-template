import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import db from "./db";
import env from "./env";

// Get environment variables from our centralized env config
const betterAuthSecret = env.BETTER_AUTH_SECRET || "your-secret-key-at-least-32-characters-long-change-in-production";
const betterAuthUrl = env.BETTER_AUTH_URL || "http://localhost:3000";

// Debug logging
console.log("Better Auth Config:", {
  hasSecret: !!betterAuthSecret,
  secretLength: betterAuthSecret.length,
  baseURL: betterAuthUrl,
});

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  secret: betterAuthSecret,
  baseURL: betterAuthUrl,
});
