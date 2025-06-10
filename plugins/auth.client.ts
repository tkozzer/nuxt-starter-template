export default defineNuxtPlugin(async () => {
  // This runs only on the client side
  const { refresh } = useAuth();

  // Check authentication status on app load
  await refresh();
});
