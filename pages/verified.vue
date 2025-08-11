<script setup lang="ts">
const route = useRoute();
const to = computed(() => (route.query.redirect as string) || "/dashboard");

definePageMeta({
  layout: false,
  title: "Email verified",
});

onMounted(async () => {
  // small delay before redirect
  await new Promise(resolve => setTimeout(resolve, 2500));
  await navigateTo(to.value, { replace: true });
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-6 text-center">
      <Icon name="lucide:badge-check" class="mx-auto h-12 w-12 text-green-500" />
      <h2 class="text-2xl font-semibold text-foreground">
        Your email has been verified
      </h2>
      <p class="text-sm text-muted-foreground">
        Redirecting to your dashboard…
      </p>
      <div>
        <NuxtLink :to="to" class="text-sm text-primary underline">
          Go now
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
