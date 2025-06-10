import { createAuthClient } from "better-auth/vue";

export const authClient = createAuthClient({
  // Base URL will be automatically detected in most cases
  // but we can specify it explicitly if needed
});
