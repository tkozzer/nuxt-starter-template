import type { User } from "@schemas";

type AuthSession = {
  user: User;
  session: {
    id: string;
    token: string;
    expiresAt: Date;
  };
};

type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
};

export function useAuth() {
  // SSR-safe reactive state using Nuxt's useState
  const authState = useState<AuthState>("auth.state", () => ({
    user: null,
    isLoading: true,
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

  // Set auth state
  const setAuth = (data: AuthSession) => {
    authState.value = {
      user: data.user,
      isLoading: false,
      error: null,
    };
  };

  // Set error state
  const setError = (errorMessage: string) => {
    authState.value = {
      user: null,
      isLoading: false,
      error: errorMessage,
    };
  };

  // Set loading state
  const setLoading = (loading: boolean) => {
    authState.value.isLoading = loading;
  };

  // Refresh auth state from server
  const refresh = async () => {
    try {
      setLoading(true);

      const response = await $fetch<{ user: User | null }>("/api/auth/session", {
        method: "GET",
      });

      if (response.user) {
        setAuth({
          user: response.user,
          session: {
            id: "session-id", // This would come from Better Auth
            token: "session-token", // This would come from Better Auth
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h from now
          },
        });
      }
      else {
        clearAuth();
      }
    }
    catch (error) {
      console.error("Auth refresh failed:", error);
      clearAuth();
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      authState.value.error = null;

      const response = await $fetch<{ user: User; success: boolean; error?: string }>("/api/auth/sign-in", {
        method: "POST",
        body: { email, password },
      });

      if (response.success && response.user) {
        setAuth({
          user: response.user,
          session: {
            id: "session-id",
            token: "session-token",
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
          },
        });

        // Navigate to dashboard or intended page
        await navigateTo("/dashboard");
        return { success: true };
      }
      else {
        setError(response.error || "Login failed");
        return { success: false, error: response.error };
      }
    }
    catch (error: any) {
      const errorMessage = error.data?.message || "Login failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Signup function
  const signup = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      authState.value.error = null;

      const response = await $fetch<{ user: User; success: boolean; error?: string }>("/api/auth/sign-up", {
        method: "POST",
        body: { name, email, password },
      });

      if (response.success && response.user) {
        setAuth({
          user: response.user,
          session: {
            id: "session-id",
            token: "session-token",
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
          },
        });

        // Navigate to dashboard
        await navigateTo("/dashboard");
        return { success: true };
      }
      else {
        setError(response.error || "Signup failed");
        return { success: false, error: response.error };
      }
    }
    catch (error: any) {
      const errorMessage = error.data?.message || "Signup failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);

      await $fetch("/api/auth/sign-out", {
        method: "POST",
      });

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
