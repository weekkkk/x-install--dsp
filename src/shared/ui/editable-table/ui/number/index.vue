<script setup lang="ts">
import type { EditableTableFieldProps } from "../../interfaces";

const props = withDefaults(defineProps<EditableTableFieldProps>(), { align: "right" });

const modelValue = defineModel<number>({ default: undefined, get(v) {
  if (props.readonly && !v)
    return 0;
  return v;
} });

const textAlign = computed(() => {
  switch (props.align) {
    case "left":
      return "text-left";
    case "right":
      return "text-right";
    default:
      return "text-left";
  }
});
</script>

<template>
  <UInputNumber
    v-model="modelValue"
    :placeholder="placeholder"
    class="absolute inset-0" :ui="{ base: `${textAlign} !text-base-sm font-medium p-3 rounded-none disabled:cursor-text disabled:opacity-100` }"
    variant="none"
    :format-options="{
      style: 'decimal',
    }"
    :disabled="readonly"
    :step="1"
    :highlight="false"
    locale="ru"
  >
    <template #decrement>
      <span />
    </template>
    <template #increment>
      <span />
    </template>
  </UInputNumber>
</template>
