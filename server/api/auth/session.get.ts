import { auth } from "~/lib/auth";

export default defineEventHandler(async (event) => {
  try {
    // Get session from Better Auth using event headers
    const session = await auth.api.getSession({
      headers: event.headers,
    });

    if (session?.user) {
      return {
        user: session.user,
        success: true,
      };
    }

    return {
      user: null,
      success: false,
    };
  }
  catch (error) {
    console.error("Session validation error:", error);
    return {
      user: null,
      success: false,
      error: "Session validation failed",
    };
  }
});
