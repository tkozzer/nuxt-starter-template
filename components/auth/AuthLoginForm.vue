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

// Auth composable for actual authentication
const { login, error } = useAuth();

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
    const result = await login(values.email, values.password);

    if (result.success) {
      emit("success");
    }
    // Error handling is managed by the useAuth composable
  }
  catch (error) {
    console.error("Login error:", error);
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

      <!-- Error Display -->
      <div v-if="error" class="text-sm text-destructive">
        {{ error }}
      </div>

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
