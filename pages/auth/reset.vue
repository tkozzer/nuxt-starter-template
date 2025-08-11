<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";

const route = useRoute();
const token = computed(() => (route.query.token as string | undefined) || "");
const hasToken = computed(() => typeof token.value === "string" && token.value.length > 0);

const schema = toTypedSchema(
  z
    .object({
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string().min(6, "Please confirm your password"),
    })
    .refine(v => v.password === v.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords don't match",
    }),
);

const form = useForm({
  validationSchema: schema,
});

const isSubmitting = ref(false);
const success = ref(false);
const errorMessage = ref<string | null>(null);

const onSubmit = form.handleSubmit(async (values) => {
  if (!hasToken.value) {
    errorMessage.value = "Invalid or expired reset link. Please request a new one.";
    return;
  }

  isSubmitting.value = true;
  errorMessage.value = null;
  try {
    await $fetch("/api/auth/reset-password", {
      method: "POST",
      credentials: "include",
      body: {
        token: token.value,
        newPassword: values.password,
      },
    });
    success.value = true;
    await navigateTo("/auth/login");
  }
  catch (e: any) {
    errorMessage.value = e?.data?.message || "Failed to reset password";
  }
  finally {
    isSubmitting.value = false;
  }
});

definePageMeta({
  layout: false,
  title: "Reset password",
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-foreground">
          Set a new password
        </h2>
        <p class="mt-2 text-center text-sm text-muted-foreground">
          Remembered it?
          <NuxtLink to="/auth/login" class="font-medium text-primary hover:text-primary/80">
            Sign in here
          </NuxtLink>
        </p>
      </div>

      <ShadowCard class="px-8">
        <form class="space-y-4" @submit="onSubmit">
          <AuthPasswordInput
            name="password"
            label="New password"
            autocomplete="new-password"
          />
          <AuthPasswordInput
            name="confirmPassword"
            label="Confirm password"
            autocomplete="new-password"
          />

          <Button
            type="submit"
            class="w-full"
            :disabled="isSubmitting || !form.meta.value.valid || !hasToken"
          >
            <Icon
              v-if="isSubmitting"
              name="lucide:loader-2"
              class="mr-2 h-4 w-4 animate-spin"
            />
            {{ isSubmitting ? 'Saving…' : 'Save new password' }}
          </Button>

          <div v-if="!hasToken" class="text-sm text-destructive text-center">
            Invalid or expired reset link. Please request a new one.
          </div>
          <div v-if="errorMessage" class="text-sm text-destructive text-center">
            {{ errorMessage }}
          </div>
        </form>
      </ShadowCard>

      <div class="text-center">
        <NuxtLink to="/" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
