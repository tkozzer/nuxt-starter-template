<script setup lang="ts">
// Redirect if already authenticated
const { isAuthenticated } = useAuth();

if (isAuthenticated.value) {
  await navigateTo("/dashboard");
}

// Auth form store for cross-page state persistence
const authFormStore = useAuthFormStore();

// Initialize store for page context
onMounted(() => {
  authFormStore.initializeForPage("login");
});

// Handle successful login
function onLoginSuccess() {
  // Success case is handled by the composable (redirects to dashboard)
  // TODO: Add actual success handling (e.g., redirect to dashboard)
}

// Page meta
definePageMeta({
  layout: false,
  title: "Log in",
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-foreground">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-muted-foreground">
          Don't have an account?
          <NuxtLink to="/auth/signup" class="font-medium text-primary hover:text-primary/80">
            Sign up here
          </NuxtLink>
        </p>
      </div>

      <ShadowCard class="px-8">
        <AuthLoginForm
          @success="onLoginSuccess"
        />
      </ShadowCard>

      <!-- Back to Home -->
      <div class="text-center">
        <NuxtLink to="/" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
