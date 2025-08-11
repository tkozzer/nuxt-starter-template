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

// Auth composable for actual authentication
const { signup, loginWithGoogle, error } = useAuth();

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
    const result = await signup(values.name, values.email, values.password);

    if (result.success) {
      // Redirect to verification notice page
      await navigateTo(`/verified?redirect=/dashboard`);
      emit("success");
    }
    // Error handling is managed by the useAuth composable
  }
  catch (error) {
    console.error("Signup error:", error);
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
        {{ isLoading ? 'Creating account...' : 'Create account' }}
      </Button>
    </form>

    <!-- Divider -->
    <div class="relative text-center">
      <span class="bg-background px-2 text-xs text-muted-foreground relative z-10">or</span>
      <div class="absolute left-0 right-0 top-1/2 h-px bg-border" />
    </div>

    <!-- Social Sign Up -->
    <Button
      type="button"
      variant="outline"
      class="w-full"
      @click="loginWithGoogle()"
    >
      <Icon name="logos:google-icon" class="mr-2 h-5 w-5" />
      Continue with Google
    </Button>

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
