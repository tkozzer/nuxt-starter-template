import type { User } from "@schemas";

import { authClient } from "~/lib/auth-client";
import { createClientLogger } from "~/lib/logger/client";

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

  // Login with Google using Better Auth
  const loginWithGoogle = async () => {
    try {
      authState.value.isLoading = true;
      authState.value.error = null;

      // Redirect-based OAuth flow
      const { error: authError } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      } as any);

      if (authError) {
        setError(authError.message || "Google sign-in failed");
        return { success: false, error: authError.message };
      }

      return { success: true };
    }
    catch (error: any) {
      const errorMessage = error.message || "Google sign-in failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
    finally {
      authState.value.isLoading = false;
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
      const log = createClientLogger("auth:logout");
      log("logout failed: %o", error);
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
      const log = createClientLogger("auth:refresh");
      log("auth refresh failed: %o", error);
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
    loginWithGoogle,
    refresh,
    clearAuth,
  };
}
