<script setup lang="ts">
import type { EditableTableFieldProps } from "../../interfaces";

defineProps<EditableTableFieldProps>();

const modelValue = defineModel<number>();
</script>

<template>
  <UInputNumber
    v-model="modelValue"
    :placeholder="placeholder"
    class="absolute inset-0" :ui="{ base: 'text-right text-base-sm font-medium p-3 rounded-none' }"
    variant="ghost"
    :format-options="{
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }"
    :step="0.01"
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
