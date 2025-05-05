<script setup lang="ts">
import type { EditableTableFieldProps } from "../../interfaces";

defineProps<EditableTableFieldProps>();

const modelValue = defineModel<number>({ default: undefined });
</script>

<template>
  <UInputNumber
    v-model="modelValue"
    :placeholder="placeholder"
    class="absolute inset-0" :ui="{ base: 'text-right !text-base-sm font-medium p-3 rounded-none' }"
    variant="none"
    :format-options="{
      style: 'decimal',
    }"
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
