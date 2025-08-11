<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";

const schema = toTypedSchema(
  z.object({
    email: z.string().email("Please enter a valid email"),
  }),
);

const form = useForm({
  validationSchema: schema,
});

const isSubmitting = ref(false);
const success = ref(false);
const errorMessage = ref<string | null>(null);

const onSubmit = form.handleSubmit(async (values) => {
  isSubmitting.value = true;
  errorMessage.value = null;
  try {
    await $fetch("/api/auth/forget-password", {
      method: "POST",
      body: {
        email: values.email,
        redirectTo: `${location.origin}/auth/reset`,
      },
      credentials: "include",
    });
    success.value = true;
  }
  catch (e: any) {
    errorMessage.value = e?.data?.message || "Failed to request reset";
  }
  finally {
    isSubmitting.value = false;
  }
});

definePageMeta({
  layout: false,
  title: "Forgot password",
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-foreground">
          Forgot your password?
        </h2>
        <p class="mt-2 text-center text-sm text-muted-foreground">
          Remember it?
          <NuxtLink to="/auth/login" class="font-medium text-primary hover:text-primary/80">
            Sign in here
          </NuxtLink>
        </p>
      </div>

      <ShadowCard class="px-8">
        <form class="space-y-4" @submit="onSubmit">
          <FormField
            v-slot="{ componentField }"
            name="email"
            :validate-on-blur="true"
          >
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  v-bind="componentField"
                  type="email"
                  autocomplete="email"
                  placeholder="you@example.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <Button
            type="submit"
            class="w-full"
            :disabled="isSubmitting || !form.meta.value.valid"
          >
            <Icon
              v-if="isSubmitting"
              name="lucide:loader-2"
              class="mr-2 h-4 w-4 animate-spin"
            />
            {{ isSubmitting ? 'Sending…' : 'Send reset link' }}
          </Button>

          <div v-if="success" class="text-sm text-green-600 text-center">
            If an account exists for that email, we sent a reset link.
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
