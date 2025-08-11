export default defineNuxtRouteMiddleware(async (to, _from) => {
  const { isAuthenticated, refresh } = useAuth();

  // Ensure auth state is fresh (handles SSR and reloads)
  if (!isAuthenticated.value) {
    await refresh();
  }

  if (!isAuthenticated.value) {
    // Not logged in → redirect to login preserving target path
    return navigateTo(`/auth/login?redirect=${encodeURIComponent(to.fullPath)}`);
  }
});
