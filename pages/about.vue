<script setup lang="ts">
useHead({
  title: "About - Nuxt Starter Template",
  meta: [
    { name: "description", content: "Learn about this comprehensive Nuxt 3 template with shadcn-vue components." },
  ],
});
</script>

<template>
  <div class="container mx-auto px-4 py-16">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-8">
        About This Template
      </h1>

      <div class="space-y-6 text-lg text-muted-foreground">
        <p>
          This Nuxt Starter Template is a comprehensive starting point for modern Vue.js applications.
          It combines the power of Nuxt 3 with the beauty of shadcn-vue components and the utility of Tailwind CSS.
        </p>

        <p>
          Built with developer experience in mind, this template includes TypeScript support,
          ESLint configuration, automatic imports, and a complete theming system with dark mode support.
        </p>

        <Card class="p-6 mt-8">
          <CardHeader>
            <CardTitle>Template Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul class="list-disc list-inside space-y-2">
              <li>Nuxt 3 with TypeScript</li>
              <li>shadcn-vue component library</li>
              <li>Tailwind CSS v4 with custom theming</li>
              <li>Dark/Light mode support</li>
              <li>Pinia state management</li>
              <li>Zod validation</li>
              <li>ESLint with @antfu/eslint-config</li>
              <li>Auto-imports for components and composables</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
