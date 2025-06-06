import "dotenv/config";

async function runSeed() {
  console.log("🚀 Starting database seeding...\n");

  try {
    // Import and run user seeding
    const { default: seedUsersMain } = await import("./seed-users.js");
    await seedUsersMain();

    console.log("\n🎉 All seeding completed successfully!");
    process.exit(0);
  }
  catch (error) {
    console.error("\n❌ Seeding failed:", error);
    process.exit(1);
  }
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runSeed();
}

export default runSeed;
