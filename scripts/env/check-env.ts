import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirnameVar = path.dirname(__filename);

function extractEnvKeysFromFile(filePath: string): string[] {
  const content = fs.readFileSync(filePath, "utf8");
  const keys: string[] = [];
  // Match keys at start of line only; ignore comments and line labels
  const regex = /^\s*([A-Z][A-Z0-9_]*)\s*=/gm;
  for (const match of content.matchAll(regex)) {
    const key = match[1];
    if (key)
      keys.push(key);
  }
  return keys;
}

function uniqueAndDupes(keys: string[]): { unique: string[]; dupes: string[] } {
  const seen = new Set<string>();
  const dupes: string[] = [];
  for (const k of keys) {
    if (seen.has(k))
      dupes.push(k);
    else
      seen.add(k);
  }
  return { unique: Array.from(seen).sort(), dupes: Array.from(new Set(dupes)).sort() };
}

function getSchemaKeys(): string[] {
  const root = path.resolve(__dirnameVar, "../../");
  const schemaPath = path.join(root, "lib/env/index.ts");
  const content = fs.readFileSync(schemaPath, "utf8");
  const keys: string[] = [];
  const regex = /^[ \t]*([A-Z][A-Z0-9_]+)\s*:/gm;
  for (const match of content.matchAll(regex)) {
    const key = match[1];
    if (key)
      keys.push(key);
  }
  return Array.from(new Set(keys)).sort();
}

function main() {
  const root = path.resolve(__dirnameVar, "../../");
  const examplePath = path.join(root, ".env.example");
  const envPath = path.join(root, ".env");

  const exampleKeysAll = extractEnvKeysFromFile(examplePath);
  const envKeysAll = fs.existsSync(envPath) ? extractEnvKeysFromFile(envPath) : [];
  const schemaKeys = getSchemaKeys();

  const { unique: exampleKeys, dupes: exampleDupes } = uniqueAndDupes(exampleKeysAll);
  const { unique: envKeys, dupes: envDupes } = uniqueAndDupes(envKeysAll);

  function diff(a: string[], b: string[]) {
    const as = new Set(a);
    const bs = new Set(b);
    return {
      onlyInA: a.filter(k => !bs.has(k)),
      onlyInB: b.filter(k => !as.has(k)),
    };
  }

  const exampleVsSchema = diff(exampleKeys, schemaKeys);
  const envVsExample = diff(envKeys, exampleKeys);

  let hasIssue = false;

  if (exampleDupes.length > 0 || envDupes.length > 0) {
    hasIssue = true;
    console.error("Duplicate keys detected:");
    if (exampleDupes.length > 0)
      console.error(" - .env.example:", exampleDupes.join(", "));
    if (envDupes.length > 0)
      console.error(" - .env:", envDupes.join(", "));
  }

  if (exampleVsSchema.onlyInA.length > 0 || exampleVsSchema.onlyInB.length > 0) {
    hasIssue = true;
    console.error("Mismatch between .env.example and schema (lib/env/index.ts):");
    if (exampleVsSchema.onlyInA.length > 0)
      console.error(" - In example, missing in schema:", exampleVsSchema.onlyInA.join(", "));
    if (exampleVsSchema.onlyInB.length > 0)
      console.error(" - In schema, missing in example:", exampleVsSchema.onlyInB.join(", "));
  }

  if (envVsExample.onlyInA.length > 0 || envVsExample.onlyInB.length > 0) {
    hasIssue = true;
    console.error("Mismatch between .env and .env.example:");
    if (envVsExample.onlyInA.length > 0)
      console.error(" - In .env, missing in example:", envVsExample.onlyInA.join(", "));
    if (envVsExample.onlyInB.length > 0)
      console.error(" - In example, missing in .env:", envVsExample.onlyInB.join(", "));
  }

  if (hasIssue) {
    process.exit(1);
  }
  else {
    console.log("Environment files are consistent with schema. No duplicates detected.");
  }
}

main();
