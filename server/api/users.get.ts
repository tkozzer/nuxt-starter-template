import db from "@db";
import { user } from "@schemas";
import { eq } from "drizzle-orm";
import { createError, defineEventHandler } from "h3";

import { auth } from "~/lib/auth";

export default defineEventHandler(async (event) => {
  try {
    // Require authenticated admin
    const session = await auth.api.getSession({ headers: event.headers });
    if (!session?.user) {
      event.context.logger.warn({ msg: "users:list:unauthorized" });
      throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }

    const result = await db
      .select({ admin: user.admin })
      .from(user)
      .where(eq(user.id, session.user.id))
      .limit(1);
    const isAdmin = result[0]?.admin === true;
    if (!isAdmin) {
      event.context.logger.warn({ msg: "users:list:forbidden", userId: session.user.id });
      throw createError({ statusCode: 403, statusMessage: "Forbidden" });
    }

    const allUsers = await db.select().from(user);

    return {
      success: true,
      data: allUsers,
      count: allUsers.length,
    };
  }
  catch (error) {
    event.context.logger.error({ msg: "users:list:error", err: error });
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch users",
    });
  }
});
