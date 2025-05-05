<script setup lang="ts">
import type { EditableTableFieldProps } from "../../interfaces";

defineProps<EditableTableFieldProps>();

const modelValue = defineModel<string>({ default: "" });

function onBlur(e: FocusEvent) {
  const newValue = (e.target as HTMLInputElement).value;
  if (modelValue.value === newValue)
    return;
  modelValue.value = newValue;
}
</script>

<template>
  <UInput
    :placeholder="placeholder"
    class="absolute inset-0"
    :model-value="modelValue" :ui="{ base: 'text-right text-base-sm font-medium p-3 rounded-none' }"
    variant="none"
    @blur="onBlur"
  />
</template>
