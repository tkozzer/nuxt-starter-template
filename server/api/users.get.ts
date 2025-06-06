import db from "@db";
import { users } from "@schemas";

export default defineEventHandler(async () => {
  try {
    const allUsers = await db.select().from(users);

    return {
      success: true,
      data: allUsers,
      count: allUsers.length,
    };
  }
  catch (error) {
    console.error("Error fetching users:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch users",
    });
  }
});
