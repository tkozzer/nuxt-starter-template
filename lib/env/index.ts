import { z } from "zod";

import tryParseEnv from "./try-parse-env";

const EnvSchema = z.object({
  NODE_ENV: z.string(),
  DATABASE_URL: z.string(),

  // Supabase Configuration
  SUPABASE_DATABASE_URL: z.string().optional(), // Alternative database URL for Supabase

  // Nuxt Public Variables (client-side accessible)
  SUPABASE_URL: z.string().optional(), // Supabase project URL
  SUPABASE_ANON_KEY: z.string().optional(), // Supabase anonymous key

  // Nuxt Private Variables (server-side only)
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(), // Supabase service role key (server-side only)
});

export type EnvSchema = z.infer<typeof EnvSchema>;

tryParseEnv(EnvSchema);

// eslint-disable-next-line node/no-process-env
export default EnvSchema.parse(process.env);
