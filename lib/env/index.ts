import { z } from "zod";

import tryParseEnv from "./try-parse-env";

const EnvSchema = z.object({
  NODE_ENV: z.string(),
  DATABASE_URL: z.string(),

  // Better Auth Configuration
  BETTER_AUTH_SECRET: z.string().optional(),
  BETTER_AUTH_URL: z.string().optional(),

  // Supabase Configuration
  SUPABASE_DATABASE_URL: z.string().optional(), // Alternative database URL for Supabase

  // Nuxt Public Variables (client-side accessible)
  SUPABASE_URL: z.string().optional(), // Supabase project URL
  SUPABASE_ANON_KEY: z.string().optional(), // Supabase anonymous key

  // Nuxt Private Variables (server-side only)
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(), // Supabase service role key (server-side only)

  // OAuth Providers (Google)
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),

  // SMTP / Email (Ethereal for development)
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string(),
  SMTP_SECURE: z.string(), // "true" | "false"
  SMTP_USER: z.string(),
  SMTP_PASSWORD: z.string(),
  SMTP_FROM_NAME: z.string(),
  SMTP_FROM_EMAIL: z.string(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

tryParseEnv(EnvSchema);

// eslint-disable-next-line node/no-process-env
export default EnvSchema.parse(process.env);
