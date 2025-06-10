<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";

import { authSchemas } from "~/lib/schemas/auth";

type AuthSignupFormProps = {
  mode?: "dialog" | "page";
  showSwitchToLogin?: boolean;
};

type AuthSignupFormEmits = {
  (e: "success"): void;
  (e: "switchToLogin"): void;
};

const {
  mode: _mode = "page",
  showSwitchToLogin = false,
} = defineProps<AuthSignupFormProps>();

const emit = defineEmits<AuthSignupFormEmits>();

// Auth form store for state persistence
const authFormStore = useAuthFormStore();
const { formData } = storeToRefs(authFormStore);

// Initialize form with useForm composable
const form = useForm({
  validationSchema: toTypedSchema(authSchemas.signup),
  initialValues: {
    name: formData.value.name,
    email: formData.value.email,
    password: "",
    confirmPassword: "",
  },
});

// Form state
const isLoading = ref(false);

// Handle form submission
const onSubmit = form.handleSubmit(async (values) => {
  isLoading.value = true;

  try {
    console.log("Signup form submitted:", values);

    // Show development info
    if (import.meta.dev) {
      console.log("Demo signup - check console for values");
    }

    // TODO: Implement actual signup logic here
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

    emit("success");
  }
  catch (error) {
    console.error("Signup error:", error);
    // TODO: Handle signup errors
  }
  finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="space-y-4">
    <form class="space-y-4" @submit="onSubmit">
      <!-- Name Field -->
      <AuthNameInput
        v-model="formData.name"
        @update:model-value="authFormStore.updateName"
      />

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
        autocomplete="new-password"
        placeholder="Create a password"
      />

      <!-- Confirm Password Field -->
      <AuthPasswordInput
        name="confirmPassword"
        label="Confirm Password"
        autocomplete="new-password"
        placeholder="Confirm your password"
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
        {{ isLoading ? 'Creating account...' : 'Create account' }}
      </Button>
    </form>

    <!-- Switch to Login -->
    <div v-if="showSwitchToLogin" class="text-center text-sm">
      <span class="text-muted-foreground">Already have an account? </span>
      <Button
        variant="link"
        class="p-0 h-auto font-normal"
        @click="emit('switchToLogin')"
      >
        Sign in
      </Button>
    </div>
  </div>
</template>
