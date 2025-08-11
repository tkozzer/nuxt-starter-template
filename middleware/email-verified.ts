export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const { user, isAuthenticated, refresh } = useAuth();

  if (!isAuthenticated.value) {
    await refresh();
  }

  // If still not authenticated, let auth middleware handle redirect when chained
  if (!isAuthenticated.value)
    return;

  // Require verified email if user exists and field is explicitly false
  if (user.value && user.value.emailVerified === false) {
    // Send them to a simple info page that will redirect back after verification
    return navigateTo(`/verified?redirect=${encodeURIComponent(_to.fullPath)}`);
  }
});
