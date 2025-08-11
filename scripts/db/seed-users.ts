import "dotenv/config";
import { eq } from "drizzle-orm";

import { auth } from "../../lib/auth";
import db from "../../lib/db";
import { user } from "../../lib/db/schema";

const sampleUsers = [
  // ADMIN USER
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    admin: true,
  },
  // REGULAR USERS
  {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
    admin: false,
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    password: "password123",
    admin: false,
  },
  {
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    password: "password123",
    admin: false,
  },
  {
    name: "Alice Wilson",
    email: "alice.wilson@example.com",
    password: "password123",
    admin: false,
  },
  {
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    password: "password123",
    admin: false,
  },
];

async function seedUsers() {
  console.log("🌱 Seeding users (5 regular + 1 admin)...");

  try {
    const insertedUsers = [] as Array<{ email: string; name: string; admin: boolean }>;

    for (const userData of sampleUsers) {
      try {
        // Use Better Auth API to create users - this handles ID generation
        const result = await auth.api.signUpEmail({
          body: {
            email: userData.email,
            password: userData.password,
            name: userData.name,
          },
        });

        if (result && result.user) {
          insertedUsers.push({
            email: userData.email,
            name: userData.name,
            admin: userData.admin,
          });
          const userType = userData.admin ? "👑 ADMIN" : "👤 USER";
          console.log(`   ✅ Created ${userType}: ${userData.name} (${userData.email})`);
        }
      }
      catch {
        console.log(`   ⚠️  Skipped ${userData.email} (may already exist)`);
      }
      finally {
        // Ensure admin flag is set even if the user existed already
        if (userData.admin) {
          await db
            .update(user)
            .set({ admin: true })
            .where(eq(user.email, userData.email));
          console.log(`   👑 Ensured admin privileges for ${userData.email}`);
        }
      }
    }

    console.log(`🎉 Successfully seeded ${insertedUsers.length} users!`);
    console.log("📋 See credentials in scripts/docs/ directory");
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
