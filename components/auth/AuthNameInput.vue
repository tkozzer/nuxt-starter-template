<script setup lang="ts">
type AuthNameInputProps = {
  modelValue?: string;
  label?: string;
  placeholder?: string;
  autocomplete?: string;
};

const {
  modelValue = "",
  label = "Full name",
  placeholder = "Enter your full name",
  autocomplete = "name",
} = defineProps<AuthNameInputProps>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>

<template>
  <FormField
    v-slot="{ componentField }"
    name="name"
    :validate-on-blur="true"
  >
    <FormItem>
      <FormLabel>
        {{ label }}
      </FormLabel>
      <FormControl>
        <Input
          v-bind="componentField"
          type="text"
          name="name"
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
