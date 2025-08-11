<script setup lang="ts">
// Page metadata
useHead({
  title: "Nuxt Starter Template - Modern Vue.js Development",
  meta: [
    { name: "description", content: "A comprehensive Nuxt 3 template with shadcn-vue components, Tailwind CSS, TypeScript, and modern development tools." },
  ],
});

import { useToasts } from "~/composables/useToasts";
import { createClientLogger } from "~/lib/logger/client";

const { info, success, warning, error, promise } = useToasts();
const demoLog = createClientLogger("app:demo");

function showInfo() {
  info("Heads up!", "Informational toast");
}

function showSuccess() {
  success("Success!", "Your action completed");
}

function showWarning() {
  warning("Warning!", "Please double-check your input");
}

function showError() {
  error("Error!", "Something went wrong");
}

async function showPromise() {
  await promise(
    () => new Promise(resolve => setTimeout(resolve, 1500)),
    {
      loading: "Processing...",
      success: () => "Done!",
      error: () => "Failed",
    },
  );
}

function toastInDialog() {
  info("Dialog toast", "Toast triggered from inside dialog");
}

function showDebugLog() {
  demoLog("debug demo clicked at %s", new Date().toISOString());
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Hero Section -->
    <div class="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div class="space-y-4">
        <h1 class="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Welcome to
          <br>
          <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Nuxt Starter Template
          </span>
        </h1>
        <p class="mx-auto max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          A modern, comprehensive Nuxt 3 template with shadcn-vue components, Tailwind CSS, TypeScript, and more.
        </p>
      </div>

      <!-- Toast Demo Buttons -->
      <div class="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        <Button variant="outline" @click="showInfo">
          Info
        </Button>
        <Button variant="outline" @click="showSuccess">
          Success
        </Button>
        <Button variant="outline" @click="showWarning">
          Warning
        </Button>
        <Button variant="outline" @click="showError">
          Error
        </Button>
        <Button variant="default" @click="showPromise">
          Promise
        </Button>
        <Button variant="outline" @click="showDebugLog">
          Debug log
        </Button>

        <!-- Dialog test: open dialog and trigger a toast inside -->
        <Dialog>
          <DialogTrigger as-child>
            <Button variant="secondary">
              Open Dialog
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Toast inside dialog</DialogTitle>
              <DialogDescription>
                Click the button below to show a toast while this dialog is open.
              </DialogDescription>
            </DialogHeader>

            <div class="mt-4">
              <Button @click="toastInDialog">
                Show toast in dialog
              </Button>
            </div>

            <DialogFooter>
              <DialogClose as-child>
                <Button variant="outline">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4">
        <AuthDialogTrigger
          mode="signup"
          size="lg"
          class="text-lg px-8"
        >
          <Icon name="lucide:rocket" class="mr-2 h-5 w-5" />
          Get Started
        </AuthDialogTrigger>
        <Button
          variant="outline"
          size="lg"
          class="text-lg px-8"
        >
          <Icon name="lucide:github" class="mr-2 h-5 w-5" />
          View on GitHub
        </Button>
      </div>
    </div>

    <!-- Features Grid -->
    <div class="mt-16">
      <h2 class="text-3xl font-bold text-center mb-12">
        Everything You Need
      </h2>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <!-- Feature Card 1 -->
        <ShadowCard
          shadow-size="lg"
          shadow-color="blue-500"
          dark-shadow-color="blue-400"
          class="border-2 hover:border-primary/20 transition-colors p-6"
        >
          <div class="flex items-center space-x-2 mb-2">
            <div class="p-2 bg-primary/10 rounded-lg">
              <Icon name="lucide:zap" class="h-6 w-6 text-primary" />
            </div>
            <h3 class="text-xl font-semibold">
              Nuxt 3
            </h3>
          </div>
          <p class="text-sm text-muted-foreground">
            Full-stack Vue.js framework with SSR, auto-imports, and file-based routing.
          </p>
        </ShadowCard>

        <!-- Feature Card 2 -->
        <ShadowCard
          shadow-size="lg"
          shadow-color="purple-500"
          dark-shadow-color="purple-400"
          class="border-2 hover:border-primary/20 transition-colors p-6"
        >
          <div class="flex items-center space-x-2 mb-2">
            <div class="p-2 bg-primary/10 rounded-lg">
              <Icon name="lucide:palette" class="h-6 w-6 text-primary" />
            </div>
            <h3 class="text-xl font-semibold">
              shadcn-vue
            </h3>
          </div>
          <p class="text-sm text-muted-foreground">
            Beautiful, accessible components built with Reka UI and Tailwind CSS.
          </p>
        </ShadowCard>

        <!-- Feature Card 3 -->
        <ShadowCard
          shadow-size="lg"
          shadow-color="emerald-500"
          dark-shadow-color="emerald-400"
          class="border-2 hover:border-primary/20 transition-colors p-6"
        >
          <div class="flex items-center space-x-2 mb-2">
            <div class="p-2 bg-primary/10 rounded-lg">
              <Icon name="lucide:code" class="h-6 w-6 text-primary" />
            </div>
            <h3 class="text-xl font-semibold">
              TypeScript
            </h3>
          </div>
          <p class="text-sm text-muted-foreground">
            Static type checking and enhanced IDE support for better development.
          </p>
        </ShadowCard>

        <!-- Feature Card 4 -->
        <ShadowCard
          shadow-size="lg"
          shadow-color="cyan-500"
          dark-shadow-color="cyan-400"
          class="border-2 hover:border-primary/20 transition-colors p-6"
        >
          <div class="flex items-center space-x-2 mb-2">
            <div class="p-2 bg-primary/10 rounded-lg">
              <Icon name="lucide:wind" class="h-6 w-6 text-primary" />
            </div>
            <h3 class="text-xl font-semibold">
              Tailwind CSS
            </h3>
          </div>
          <p class="text-sm text-muted-foreground">
            Utility-first CSS framework for rapid UI development.
          </p>
        </ShadowCard>

        <!-- Feature Card 5 -->
        <ShadowCard
          shadow-size="lg"
          shadow-color="pink-500"
          dark-shadow-color="pink-400"
          class="border-2 hover:border-primary/20 transition-colors p-6"
        >
          <div class="flex items-center space-x-2 mb-2">
            <div class="p-2 bg-primary/10 rounded-lg">
              <Icon name="lucide:database" class="h-6 w-6 text-primary" />
            </div>
            <h3 class="text-xl font-semibold">
              Pinia
            </h3>
          </div>
          <p class="text-sm text-muted-foreground">
            TypeScript-first Vue state management library.
          </p>
        </ShadowCard>

        <!-- Feature Card 6 -->
        <ShadowCard
          shadow-size="lg"
          shadow-color="orange-500"
          dark-shadow-color="orange-400"
          class="border-2 hover:border-primary/20 transition-colors p-6"
        >
          <div class="flex items-center space-x-2 mb-2">
            <div class="p-2 bg-primary/10 rounded-lg">
              <Icon name="lucide:shield-check" class="h-6 w-6 text-primary" />
            </div>
            <h3 class="text-xl font-semibold">
              Validation
            </h3>
          </div>
          <p class="text-sm text-muted-foreground">
            Schema validation and type inference with Zod.
          </p>
        </ShadowCard>

        <!-- Feature Card 7 -->
        <ShadowCard
          shadow-size="lg"
          shadow-color="teal-500"
          dark-shadow-color="teal-400"
          class="border-2 hover:border-primary/20 transition-colors p-6"
        >
          <div class="flex items-center space-x-2 mb-2">
            <div class="p-2 bg-primary/10 rounded-lg">
              <Icon name="lucide:database" class="h-6 w-6 text-primary" />
            </div>
            <h3 class="text-xl font-semibold">
              Drizzle ORM
            </h3>
          </div>
          <p class="text-sm text-muted-foreground">
            TypeScript ORM with SQL-like syntax and excellent developer experience.
          </p>
        </ShadowCard>

        <!-- Feature Card 8 -->
        <ShadowCard
          shadow-size="lg"
          shadow-color="amber-500"
          dark-shadow-color="amber-400"
          class="border-2 hover:border-primary/20 transition-colors p-6"
        >
          <div class="flex items-center space-x-2 mb-2">
            <div class="p-2 bg-primary/10 rounded-lg">
              <Icon name="lucide:key-round" class="h-6 w-6 text-primary" />
            </div>
            <h3 class="text-xl font-semibold">
              Better Auth
            </h3>
          </div>
          <p class="text-sm text-muted-foreground">
            Email/password auth with SSR-safe sessions, admin roles, and Drizzle integration.
          </p>
        </ShadowCard>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="mt-16 text-center">
      <ShadowCard
        shadow-size="xl"
        shadow-color="indigo-500"
        dark-shadow-color="indigo-400"
        class="mx-auto max-w-2xl p-8"
      >
        <div class="mb-6">
          <h2 class="text-2xl font-semibold mb-2">
            Ready to Start Building?
          </h2>
          <p class="text-lg text-muted-foreground">
            Clone this template and start building your next amazing project.
          </p>
        </div>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg">
            <Icon name="lucide:download" class="mr-2 h-5 w-5" />
            Clone Template
          </Button>
          <Button variant="outline" size="lg">
            <Icon name="lucide:book-open" class="mr-2 h-5 w-5" />
            Read Documentation
          </Button>
        </div>
      </ShadowCard>
    </div>
  </div>
</template>
