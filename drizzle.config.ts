import "dotenv/config";
import { defineConfig } from "drizzle-kit";

import env from "./lib/env";

export default defineConfig({
  dialect: "postgresql",
  schema: "./lib/db/schema",
  out: "./lib/db/migrations",
  casing: "snake_case",
  dbCredentials: {
    url: env.DATABASE_URL!,
  },
  verbose: false,
});
