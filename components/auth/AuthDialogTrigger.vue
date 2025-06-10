<script setup lang="ts">
type AuthDialogTriggerProps = {
  mode?: "login" | "signup";
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg";
};

const { mode = "login", variant = "default", size = "default" } = defineProps<AuthDialogTriggerProps>();

const isDialogOpen = ref(false);

function openAuthDialog() {
  isDialogOpen.value = true;
}

function onAuthSuccess(data: { mode: "login" | "signup" }) {
  console.log(`Auth success: ${data.mode}`);
  // You can add custom logic here, like showing a toast notification
  // or redirecting to a specific page
}
</script>

<template>
  <div>
    <!-- Trigger Button -->
    <Button
      :variant="variant"
      :size="size"
      @click="openAuthDialog"
    >
      <slot>
        {{ mode === 'login' ? 'Log in' : 'Sign up' }}
      </slot>
    </Button>

    <!-- Auth Dialog -->
    <AuthDialog
      v-model:open="isDialogOpen"
      :default-mode="mode"
      @success="onAuthSuccess"
    />
  </div>
</template>
