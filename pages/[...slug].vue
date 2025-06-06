<script setup lang="ts">
// Handle Chrome DevTools requests silently
const route = useRoute();

// If it's a Chrome DevTools request, don't show any error
if (route.path.includes(".well-known/appspecific/com.chrome.devtools")) {
  // Set a minimal response for DevTools
  setResponseStatus(404);
}

useHead({
  title: "404 - Page Not Found",
  meta: [
    { name: "description", content: "The page you are looking for could not be found." },
  ],
});
</script>

<template>
  <div class="container mx-auto px-4 py-16 text-center">
    <div class="max-w-md mx-auto">
      <h1 class="text-4xl font-bold mb-4">
        404
      </h1>
      <h2 class="text-xl text-muted-foreground mb-6">
        Page Not Found
      </h2>
      <p class="text-muted-foreground mb-8">
        The page you're looking for doesn't exist.
      </p>
      <Button class="mr-4" @click="$router.push('/')">
        <Icon name="lucide:home" class="mr-2 h-4 w-4" />
        Go Home
      </Button>
      <Button variant="outline" @click="$router.back()">
        <Icon name="lucide:arrow-left" class="mr-2 h-4 w-4" />
        Go Back
      </Button>
    </div>
  </div>
</template>
