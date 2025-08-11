import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import env from "../env";
import * as schema from "./schema";

// Prefer local DATABASE_URL; fall back to SUPABASE_DATABASE_URL when explicitly set
const connectionUrl = env.DATABASE_URL || env.SUPABASE_DATABASE_URL;
if (!connectionUrl) {
  throw new Error("DATABASE_URL or SUPABASE_DATABASE_URL must be set");
}

const client = postgres(connectionUrl, { prepare: false });

const db = drizzle(client, { schema });

export default db;
