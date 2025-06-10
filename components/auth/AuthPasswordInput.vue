<script setup lang="ts">
// (No explicit imports needed – Nuxt auto-imports `ref` and Icon component)

type AuthPasswordInputProps = {
  name?: string;
  label?: string;
  autocomplete?: string;
  placeholder?: string;
  modelValue?: string;
};

const {
  name = "password",
  label = "Password",
  autocomplete = "current-password",
  placeholder = "Enter your password",
  modelValue = "",
} = defineProps<AuthPasswordInputProps>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const showPassword = ref(false);

function toggleVisibility() {
  showPassword.value = !showPassword.value;
}
</script>

<template>
  <FormField
    v-slot="{ componentField }"
    :name="name"
    :validate-on-blur="true"
  >
    <FormItem>
      <FormLabel>
        {{ label }}
      </FormLabel>
      <FormControl>
        <div class="relative">
          <Input
            v-bind="componentField"
            :type="showPassword ? 'text' : 'password'"
            :autocomplete="autocomplete"
            spellcheck="false"
            :placeholder="placeholder"
            class="pr-10"
            :model-value="modelValue"
            @update:model-value="emit('update:modelValue', $event)"
          />
          <!-- Toggle visibility button -->
          <button
            type="button"
            class="absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground hover:text-foreground focus:outline-none"
            tabindex="-1"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
            @click="toggleVisibility"
          >
            <Icon
              v-if="showPassword"
              name="lucide:eye-off"
              class="h-4 w-4"
            />
            <Icon
              v-else
              name="lucide:eye"
              class="h-4 w-4"
            />
          </button>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
