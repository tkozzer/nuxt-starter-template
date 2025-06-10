export default defineNuxtRouteMiddleware(async (to, _from) => {
  const { isAuthenticated, user, refresh } = useAuth();

  // Ensure auth state is fresh (especially on page reload)
  if (!isAuthenticated.value) {
    await refresh();
  }

  if (!isAuthenticated.value) {
    // Not logged in → redirect to login preserving target path
    return navigateTo(`/auth/login?redirect=${encodeURIComponent(to.fullPath)}`);
  }

  if (!user.value?.admin) {
    // Logged in but not admin → redirect to unauthorized page
    return navigateTo("/unauthorized");
  }
});
