import type { User } from "@schemas";

import { authClient } from "~/lib/auth-client";

type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
};

export function useAuth() {
  // SSR-safe reactive state using Nuxt's useState
  const authState = useState<AuthState>("auth.state", () => ({
    user: null,
    isLoading: false,
    error: null,
  }));

  // Computed properties for easy access
  const user = computed(() => authState.value.user);
  const isAuthenticated = computed(() => !!authState.value.user);
  const isLoading = computed(() => authState.value.isLoading);
  const error = computed(() => authState.value.error);
  const isAdmin = computed(() => authState.value.user?.admin || false);

  // Clear auth state
  const clearAuth = () => {
    authState.value = {
      user: null,
      isLoading: false,
      error: null,
    };
  };

  // Set error state
  const setError = (errorMessage: string) => {
    authState.value.error = errorMessage;
    authState.value.isLoading = false;
  };

  // Login function using Better Auth
  const login = async (email: string, password: string) => {
    try {
      authState.value.isLoading = true;
      authState.value.error = null;

      const { data, error: authError } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/dashboard",
      });

      if (authError) {
        setError(authError.message || "Login failed");
        return { success: false, error: authError.message };
      }

      if (data?.user) {
        authState.value.user = data.user as User;
        authState.value.error = null;
        authState.value.isLoading = false;

        // Navigate to dashboard
        await navigateTo("/dashboard");
        return { success: true };
      }

      setError("Login failed");
      return { success: false, error: "Login failed" };
    }
    catch (error: any) {
      const errorMessage = error.message || "Login failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Signup function using Better Auth
  const signup = async (name: string, email: string, password: string) => {
    try {
      authState.value.isLoading = true;
      authState.value.error = null;

      const { data, error: authError } = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: "/dashboard",
      });

      if (authError) {
        setError(authError.message || "Signup failed");
        return { success: false, error: authError.message };
      }

      if (data?.user) {
        authState.value.user = data.user as User;
        authState.value.error = null;
        authState.value.isLoading = false;

        // Navigate to dashboard
        await navigateTo("/dashboard");
        return { success: true };
      }

      setError("Signup failed");
      return { success: false, error: "Signup failed" };
    }
    catch (error: any) {
      const errorMessage = error.message || "Signup failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Logout function using Better Auth
  const logout = async () => {
    try {
      authState.value.isLoading = true;

      await authClient.signOut();

      clearAuth();
      await navigateTo("/");
    }
    catch (error) {
      console.error("Logout failed:", error);
      // Clear auth state even if API call fails
      clearAuth();
      await navigateTo("/");
    }
  };

  // Refresh auth state from server
  const refresh = async () => {
    try {
      authState.value.isLoading = true;

      // Build fetch options that work in both client & server contexts
      const fetchOptions: any = {};

      if (import.meta.client) {
        // In the browser we can simply include credentials so cookies are sent automatically
        fetchOptions.credentials = "include" as const;
      }
      else {
        // On the server we need to forward the cookie header manually so the API endpoint
        // can read the session cookie. Nuxt provides a helper to access request headers.
        const headers = useRequestHeaders(["cookie"]);
        if (headers.cookie) {
          fetchOptions.headers = {
            cookie: headers.cookie,
          };
        }
      }

      // Get fresh session from our API which augments admin flag
      const { user: sessionUser } = await $fetch<{ user: User | null; success: boolean }>(
        "/api/auth/session",
        fetchOptions,
      );

      if (sessionUser) {
        authState.value.user = sessionUser;
        authState.value.error = null;
      }
      else {
        clearAuth();
      }
    }
    catch (error) {
      console.error("Auth refresh failed:", error);
      clearAuth();
    }
    finally {
      authState.value.isLoading = false;
    }
  };

  return {
    // State
    user: readonly(user),
    isAuthenticated: readonly(isAuthenticated),
    isLoading: readonly(isLoading),
    error: readonly(error),
    isAdmin: readonly(isAdmin),

    // Actions
    login,
    signup,
    logout,
    refresh,
    clearAuth,
  };
}
