import type { User } from "@schemas";

export default defineNuxtPlugin(async () => {
  // Get initial session state from our API to include admin flag
  const { user } = await $fetch<{ user: User | null; success: boolean }>("/api/auth/session", { credentials: "include" });

  const authState = useState("auth.state");

  if (user) {
    authState.value = {
      user,
      isLoading: false,
      error: null,
    };
  }
  else {
    authState.value = {
      user: null,
      isLoading: false,
      error: null,
    };
  }
});
