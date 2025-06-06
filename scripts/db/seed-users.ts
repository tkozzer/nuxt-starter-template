import "dotenv/config";

import db from "../../lib/db";
import { users } from "../../lib/db/schema";

const sampleUsers = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    emailVerified: true,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    emailVerified: true,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces&auto=format&q=60",
  },
  {
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    emailVerified: false,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Alice Wilson",
    email: "alice.wilson@example.com",
    emailVerified: true,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    emailVerified: false,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
];

async function seedUsers() {
  console.log("🌱 Seeding users...");

  try {
    // Clear existing users (optional - remove if you want to keep existing data)
    await db.delete(users);
    console.log("🗑️  Cleared existing users");

    // Insert sample users
    const insertedUsers = await db.insert(users).values(sampleUsers).returning();

    console.log(`✅ Successfully seeded ${insertedUsers.length} users:`);
    insertedUsers.forEach((user) => {
      console.log(`   - ${user.name} (${user.email})`);
    });
  }
  catch (error) {
    console.error("❌ Error seeding users:", error);
    process.exit(1);
  }
}

async function seedUsersMain() {
  await seedUsers();
  console.log("🎉 User seeding completed!");
}

async function main() {
  await seedUsersMain();
  process.exit(0);
}

// Run the seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default seedUsersMain;
