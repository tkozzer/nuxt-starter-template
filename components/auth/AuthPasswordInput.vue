<script setup lang="ts">
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
        <Input
          v-bind="componentField"
          type="password"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :model-value="modelValue"
          @update:model-value="emit('update:modelValue', $event)"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
