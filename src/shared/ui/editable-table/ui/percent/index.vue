<script setup lang="ts">
import type { EditableTableFieldProps } from "../../interfaces";

defineProps<EditableTableFieldProps>();

const modelValue = defineModel<number>({ default: undefined, get: v => v / 100, set: v => v * 100 });
</script>

<template>
  <UInputNumber
    v-model="modelValue"
    :placeholder="placeholder"
    class="absolute inset-0" :ui="{ base: 'text-right text-base-sm font-medium p-3 rounded-none' }"
    variant="none"
    :format-options="{
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }"
    :step="0.0001"
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
