<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";

import { authSchemas } from "~/lib/schemas/auth";

type AuthLoginFormProps = {
  showSwitchToSignup?: boolean;
};

type AuthLoginFormEmits = {
  (e: "success"): void;
  (e: "switchToSignup"): void;
};

const { showSwitchToSignup = false } = defineProps<AuthLoginFormProps>();
const emit = defineEmits<AuthLoginFormEmits>();

// Auth form store for state persistence
const authFormStore = useAuthFormStore();
const { formData } = storeToRefs(authFormStore);

// Initialize form with useForm composable
const form = useForm({
  validationSchema: toTypedSchema(authSchemas.login),
  initialValues: {
    email: formData.value.email,
    password: "",
  },
});

// Form state
const isLoading = ref(false);

// Handle form submission
const onSubmit = form.handleSubmit(async (values) => {
  isLoading.value = true;

  try {
    console.log("Login form submitted:", values);

    // Show test credentials in development
    if (import.meta.dev) {
      console.log("Test credentials - Admin: admin@example.com / admin123, User: john.doe@example.com / password123");
    }

    // TODO: Implement actual login logic here
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

    emit("success");
  }
  catch (error) {
    console.error("Login error:", error);
    // TODO: Handle login errors
  }
  finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="space-y-4">
    <form class="space-y-4" @submit="onSubmit">
      <!-- Email Field -->
      <AuthEmailInput
        v-model="formData.email"
        autocomplete="email"
        @update:model-value="authFormStore.updateEmail"
      />

      <!-- Password Field -->
      <AuthPasswordInput
        name="password"
        label="Password"
        autocomplete="current-password"
        placeholder="Enter your password"
      />

      <!-- Submit Button -->
      <Button
        type="submit"
        class="w-full"
        :disabled="isLoading || !form.meta.value.valid"
      >
        <Icon
          v-if="isLoading"
          name="lucide:loader-2"
          class="mr-2 h-4 w-4 animate-spin"
        />
        {{ isLoading ? 'Signing in...' : 'Sign in' }}
      </Button>
    </form>

    <!-- Switch to Signup -->
    <div v-if="showSwitchToSignup" class="text-center text-sm">
      <span class="text-muted-foreground">Don't have an account? </span>
      <Button
        variant="link"
        class="p-0 h-auto font-normal"
        @click="emit('switchToSignup')"
      >
        Sign up
      </Button>
    </div>
  </div>
</template>
