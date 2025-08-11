import { eq } from "drizzle-orm";

import { auth } from "~/lib/auth";
import db from "~/lib/db";
import { user as userTable } from "~/lib/db/schema/auth";

export default defineEventHandler(async (event) => {
  try {
    // Get session from Better Auth using event headers
    const session = await auth.api.getSession({
      headers: event.headers,
    });

    if (session?.user) {
      // Fetch admin flag from database to ensure it's present in the session user object
      const dbUser = await db
        .select({ admin: userTable.admin })
        .from(userTable)
        .where(eq(userTable.id, session.user.id))
        .limit(1);

      const admin = dbUser[0]?.admin ?? false;

      return {
        user: { ...session.user, admin },
        success: true,
      };
    }

    return {
      user: null,
      success: false,
    };
  }
  catch (error) {
    event.context.logger.warn({ msg: "auth:session:validation_error", err: error });
    return {
      user: null,
      success: false,
      error: "Session validation failed",
    };
  }
});
