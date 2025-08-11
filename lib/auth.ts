import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { sendMail } from "~/server/utils/mailer";

import db from "./db";
import env from "./env";

// Get environment variables from our centralized env config
const betterAuthSecret = env.BETTER_AUTH_SECRET || "your-secret-key-at-least-32-characters-long-change-in-production";
const betterAuthUrl = env.BETTER_AUTH_URL || "http://localhost:3000";

// Debug logging (development only)
if (env.NODE_ENV !== "production") {
  console.warn("Better Auth Config:", {
    hasSecret: !!betterAuthSecret,
    secretLength: betterAuthSecret.length,
    baseURL: betterAuthUrl,
  });
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    // Send password reset email via Ethereal/Nodemailer
    async sendResetPassword({ user, url }) {
      const subject = "Reset your password";
      const html = `
        <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6;">
          <h2 style="margin: 0 0 12px;">Password reset</h2>
          <p>Click the button below to reset your password. If you did not request this, you can safely ignore this email.</p>
          <p style="margin: 16px 0;">
            <a href="${url}"
               style="display:inline-block; background:#111827; color:#ffffff; padding:10px 14px; border-radius:6px; text-decoration:none;">
               Reset password
            </a>
          </p>
          <p style="font-size: 12px; color: #6b7280;">If the button doesn't work, copy and paste this URL into your browser:</p>
          <p style="word-break: break-all; font-size: 12px; color: #6b7280;">${url}</p>
        </div>
      `;
      await sendMail({ to: user.email, subject, html });
    },
    resetPasswordTokenExpiresIn: 60 * 60, // 1 hour
  },
  emailVerification: {
    sendOnSignUp: true,
    // Send verification email via Ethereal/Nodemailer
    async sendVerificationEmail({ user, url }) {
      const subject = "Verify your email";
      const html = `
        <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6;">
          <h2 style="margin: 0 0 12px;">Verify your email</h2>
          <p>Welcome${user.name ? `, ${user.name}` : ""}! Please confirm your email address by clicking the button below.</p>
          <p style="margin: 16px 0;">
            <a href="${url}"
               style="display:inline-block; background:#111827; color:#ffffff; padding:10px 14px; border-radius:6px; text-decoration:none;">
               Verify email
            </a>
          </p>
          <p style="font-size: 12px; color: #6b7280;">If the button doesn't work, copy and paste this URL into your browser:</p>
          <p style="word-break: break-all; font-size: 12px; color: #6b7280;">${url}</p>
        </div>
      `;
      await sendMail({ to: user.email, subject, html });
    },
    expiresIn: 60 * 60, // 1 hour
    async onEmailVerification() {
      // no-op: redirection handled via callbackURL on the verification link itself
    },
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID || "",
      clientSecret: env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  secret: betterAuthSecret,
  baseURL: betterAuthUrl,
});
