<script setup lang="ts">
import { toast } from "vue-sonner";

import { Toaster } from "@/components/ui/sonner";

const colorMode = useColorMode();
const toasterTheme = computed(() => (colorMode.value === "dark" ? "dark" : "light"));

function handleToasterClick(): void {
  const items = (toast as any).getToasts?.() ?? [];
  const current = items.find((t: any) => t && !t.delete && (t.position ?? "top-right") === "top-center");
  if (current && current.id != null)
    toast.dismiss(current.id);
}
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <!-- Color Scheme component for SSR support -->
    <ColorScheme placeholder="" tag="div">
      <!-- Navigation Bar -->
      <AppNavbar />

      <!-- Global Toaster (top-center, offset below navbar) -->
      <Toaster
        position="top-center"
        :offset="64"
        :mobile-offset="64"
        :visible-toasts="1"
        :duration="6000"
        :theme="toasterTheme"
        rich-colors
        close-button
        :style="{ '--sonner-duration': '6000ms' }"
        class="pointer-events-auto z-40"
        @click="handleToasterClick"
      />

      <!-- Main Content -->
      <main class="flex-1 flex flex-col">
        <slot />
      </main>
    </ColorScheme>
  </div>
</template>
