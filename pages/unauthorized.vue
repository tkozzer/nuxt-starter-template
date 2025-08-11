<script setup lang="ts">
// Simple unauthorized page
useHead({ title: "Unauthorized" });

function goHome() {
  navigateTo("/");
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-background px-4">
    <Icon name="lucide:shield-off" class="h-16 w-16 text-destructive mb-6" />
    <h1 class="text-3xl font-bold mb-2">
      Unauthorized
    </h1>
    <p class="text-muted-foreground mb-6 text-center max-w-md">
      You do not have permission to access this page.
    </p>
    <Button @click="goHome">
      Return Home
    </Button>
  </div>
</template>
