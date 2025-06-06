<script setup lang="ts">
// Page metadata
useHead({
  title: "Nuxt Starter Template - Modern Vue.js Development",
  meta: [
    { name: "description", content: "A comprehensive Nuxt 3 template with shadcn-vue components, Tailwind CSS, TypeScript, and modern development tools." },
  ],
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Shadow Card Showcase Grid -->
    <div class="mb-12">
      <h2 class="text-2xl font-bold text-center mb-8">
        ShadowCard Component Showcase
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Card 1: Small Red Shadow -->
        <ShadowCard
          shadow-size="sm"
          shadow-color="red-500"
          dark-shadow-color="red-400"
          class="p-4"
        >
          <h3 class="font-semibold text-lg">
            Small Red
          </h3>
          <p class="text-sm text-muted-foreground">
            shadow-sm with red-500
          </p>
        </ShadowCard>

        <!-- Card 2: Medium Blue Shadow -->
        <ShadowCard
          shadow-size="md"
          shadow-color="blue-600"
          dark-shadow-color="blue-300"
          class="p-4"
        >
          <h3 class="font-semibold text-lg">
            Medium Blue
          </h3>
          <p class="text-sm text-muted-foreground">
            shadow-md with blue-600
          </p>
        </ShadowCard>

        <!-- Card 3: Large Purple Shadow -->
        <ShadowCard
          shadow-size="lg"
          shadow-color="purple-500"
          dark-shadow-color="purple-400"
          class="p-4"
        >
          <h3 class="font-semibold text-lg">
            Large Purple
          </h3>
          <p class="text-sm text-muted-foreground">
            shadow-lg with purple-500
          </p>
        </ShadowCard>

        <!-- Card 4: XL Green Shadow -->
        <ShadowCard
          shadow-size="xl"
          shadow-color="emerald-500"
          dark-shadow-color="emerald-300"
          class="p-4"
        >
          <h3 class="font-semibold text-lg">
            XL Emerald
          </h3>
          <p class="text-sm text-muted-foreground">
            shadow-xl with emerald-500
          </p>
        </ShadowCard>

        <!-- Card 5: 2XL Orange Shadow -->
        <ShadowCard
          shadow-size="2xl"
          shadow-color="orange-500"
          dark-shadow-color="orange-300"
          class="p-4"
        >
          <h3 class="font-semibold text-lg">
            2XL Orange
          </h3>
          <p class="text-sm text-muted-foreground">
            shadow-2xl with orange-500
          </p>
        </ShadowCard>

        <!-- Card 6: Large Cyan Shadow -->
        <ShadowCard
          shadow-size="lg"
          shadow-color="cyan-400"
          dark-shadow-color="cyan-200"
          class="p-4"
        >
          <h3 class="font-semibold text-lg">
            Large Cyan
          </h3>
          <p class="text-sm text-muted-foreground">
            shadow-lg with cyan-400
          </p>
        </ShadowCard>

        <!-- Card 7: Medium Pink Shadow -->
        <ShadowCard
          shadow-size="md"
          shadow-color="pink-500"
          dark-shadow-color="pink-300"
          class="p-4"
        >
          <h3 class="font-semibold text-lg">
            Medium Pink
          </h3>
          <p class="text-sm text-muted-foreground">
            shadow-md with pink-500
          </p>
        </ShadowCard>

        <!-- Card 8: XL Indigo Shadow -->
        <ShadowCard
          shadow-size="xl"
          shadow-color="indigo-600"
          dark-shadow-color="indigo-400"
          class="p-4"
        >
          <h3 class="font-semibold text-lg">
            XL Indigo
          </h3>
          <p class="text-sm text-muted-foreground">
            shadow-xl with indigo-600
          </p>
        </ShadowCard>

        <!-- Card 9: Large Teal Shadow -->
        <ShadowCard
          shadow-size="lg"
          shadow-color="teal-500"
          dark-shadow-color="teal-300"
          class="p-4"
        >
          <h3 class="font-semibold text-lg">
            Large Teal
          </h3>
          <p class="text-sm text-muted-foreground">
            shadow-lg with teal-500
          </p>
        </ShadowCard>
      </div>
    </div>

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

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4">
        <Button size="lg" class="text-lg px-8">
          <Icon name="lucide:rocket" class="mr-2 h-5 w-5" />
          Get Started
        </Button>
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
        <Card class="border-2 hover:border-primary/20 transition-colors">
          <CardHeader>
            <div class="flex items-center space-x-2">
              <div class="p-2 bg-primary/10 rounded-lg">
                <Icon name="lucide:zap" class="h-6 w-6 text-primary" />
              </div>
              <CardTitle class="text-xl">
                Nuxt 3
              </CardTitle>
            </div>
            <CardDescription>
              Full-stack Vue.js framework with SSR, auto-imports, and file-based routing.
            </CardDescription>
          </CardHeader>
        </Card>

        <!-- Feature Card 2 -->
        <Card class="border-2 hover:border-primary/20 transition-colors">
          <CardHeader>
            <div class="flex items-center space-x-2">
              <div class="p-2 bg-primary/10 rounded-lg">
                <Icon name="lucide:palette" class="h-6 w-6 text-primary" />
              </div>
              <CardTitle class="text-xl">
                shadcn-vue
              </CardTitle>
            </div>
            <CardDescription>
              Beautiful, accessible components built with Reka UI and Tailwind CSS.
            </CardDescription>
          </CardHeader>
        </Card>

        <!-- Feature Card 3 -->
        <Card class="border-2 hover:border-primary/20 transition-colors">
          <CardHeader>
            <div class="flex items-center space-x-2">
              <div class="p-2 bg-primary/10 rounded-lg">
                <Icon name="lucide:code" class="h-6 w-6 text-primary" />
              </div>
              <CardTitle class="text-xl">
                TypeScript
              </CardTitle>
            </div>
            <CardDescription>
              Static type checking and enhanced IDE support for better development.
            </CardDescription>
          </CardHeader>
        </Card>

        <!-- Feature Card 4 -->
        <Card class="border-2 hover:border-primary/20 transition-colors">
          <CardHeader>
            <div class="flex items-center space-x-2">
              <div class="p-2 bg-primary/10 rounded-lg">
                <Icon name="lucide:wind" class="h-6 w-6 text-primary" />
              </div>
              <CardTitle class="text-xl">
                Tailwind CSS
              </CardTitle>
            </div>
            <CardDescription>
              Utility-first CSS framework for rapid UI development.
            </CardDescription>
          </CardHeader>
        </Card>

        <!-- Feature Card 5 -->
        <Card class="border-2 hover:border-primary/20 transition-colors">
          <CardHeader>
            <div class="flex items-center space-x-2">
              <div class="p-2 bg-primary/10 rounded-lg">
                <Icon name="lucide:database" class="h-6 w-6 text-primary" />
              </div>
              <CardTitle class="text-xl">
                Pinia
              </CardTitle>
            </div>
            <CardDescription>
              TypeScript-first Vue state management library.
            </CardDescription>
          </CardHeader>
        </Card>

        <!-- Feature Card 6 -->
        <Card class="border-2 hover:border-primary/20 transition-colors">
          <CardHeader>
            <div class="flex items-center space-x-2">
              <div class="p-2 bg-primary/10 rounded-lg">
                <Icon name="lucide:shield-check" class="h-6 w-6 text-primary" />
              </div>
              <CardTitle class="text-xl">
                Validation
              </CardTitle>
            </div>
            <CardDescription>
              Schema validation and type inference with Zod.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="mt-16 text-center">
      <Card class="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle class="text-2xl">
            Ready to Start Building?
          </CardTitle>
          <CardDescription class="text-lg">
            Clone this template and start building your next amazing project.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  </div>
</template>
