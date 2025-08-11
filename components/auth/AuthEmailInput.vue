<script setup lang="ts">
type AuthEmailInputProps = {
  modelValue?: string;
  autocomplete?: string;
};

const {
  modelValue = "",
  autocomplete = "email",
} = defineProps<AuthEmailInputProps>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>

<template>
  <FormField
    v-slot="{ componentField }"
    name="email"
    :validate-on-blur="true"
  >
    <FormItem>
      <FormLabel>
        Email
      </FormLabel>
      <FormControl>
        <Input
          v-bind="componentField"
          type="email"
          :autocomplete="autocomplete"
          placeholder="Enter your email"
          :model-value="modelValue"
          @update:model-value="emit('update:modelValue', String($event))"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
