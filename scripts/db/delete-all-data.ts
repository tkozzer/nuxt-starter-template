import "dotenv/config";
import * as readline from "node:readline";

import db from "../../lib/db";
import { user } from "../../lib/db/schema";

// All tables in the database - add new tables here as they're created
const TABLES = [
  { name: "user", table: user },
  // Add other tables here as you create them
  // { name: "posts", table: posts },
  // { name: "comments", table: comments },
];

function createReadlineInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

function askQuestion(rl: readline.Interface, question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim().toLowerCase());
    });
  });
}

async function confirmDeletion(): Promise<boolean> {
  const rl = createReadlineInterface();

  console.log("⚠️  WARNING: This will permanently delete ALL data from your database!");
  console.log("📋 Tables that will be cleared:");
  TABLES.forEach(({ name }) => {
    console.log(`   - ${name}`);
  });
  console.log("");

  const answer = await askQuestion(rl, "Are you sure you want to continue? Type 'yes' to confirm: ");
  rl.close();

  return answer === "yes";
}

async function deleteAllData() {
  console.log("🗑️  Starting database cleanup...");

  try {
    let totalDeleted = 0;

    // Delete data from each table
    for (const { name, table } of TABLES) {
      console.log(`🧹 Clearing ${name} table...`);

      // Get count before deletion
      const countResult = await db.select().from(table);
      const recordCount = countResult.length;

      // Delete all records
      await db.delete(table);

      console.log(`   ✅ Deleted ${recordCount} records from ${name}`);
      totalDeleted += recordCount;
    }

    console.log("");
    console.log(`🎉 Successfully deleted ${totalDeleted} total records from ${TABLES.length} tables`);
    console.log("📊 Database is now empty and ready for fresh data");
  }
  catch (error) {
    console.error("❌ Error deleting data:", error);
    process.exit(1);
  }
}

async function main() {
  console.log("🧨 Database Cleanup Script");
  console.log("=========================");
  console.log("");

  // Confirm deletion
  const confirmed = await confirmDeletion();

  if (!confirmed) {
    console.log("❌ Operation cancelled by user");
    process.exit(0);
  }

  console.log("");

  // Perform deletion
  await deleteAllData();

  console.log("");
  console.log("✨ Database cleanup completed successfully!");
  process.exit(0);
}

// Run the script if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error("❌ Script failed:", error);
    process.exit(1);
  });
}

export default deleteAllData;
