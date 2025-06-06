<script setup lang="ts">
import { computed } from "vue";

import type { ShadowCardProps, ShadowColor } from "@/lib/types/components/common/shadow-card";

import { SHADOW_CARD_DEFAULTS } from "@/lib/types/components/common/shadow-card";
import { cn } from "@/lib/utils";

const props = withDefaults(defineProps<ShadowCardProps>(), SHADOW_CARD_DEFAULTS);

// Compute the shadow classes based on props
const shadowClasses = computed(() => {
  if (props.shadowSize === "none")
    return "";

  // Always include the base size (e.g. "shadow-lg" or "shadow-sm")
  const baseClass = `shadow-${props.shadowSize}`;

  // For colors that need explicit "/25" (white & black), append it;
  // otherwise just pass the color exactly (e.g. "red-500").
  const formatColor = (color?: ShadowColor) => {
    if (!color)
      return "";
    return ["white", "black"].includes(color) ? `${color}/25` : color;
  };

  const light = props.shadowColor ? `shadow-${formatColor(props.shadowColor)}` : "";
  const dark = props.darkShadowColor ? `dark:shadow-${formatColor(props.darkShadowColor)}` : "";

  const finalClasses = [baseClass, light, dark].filter(Boolean).join(" ");

  return finalClasses;
});
</script>

<template>
  <div
    data-slot="card"
    :class="
      cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6',
        shadowClasses,
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
