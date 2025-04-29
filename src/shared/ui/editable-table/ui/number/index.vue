<script setup lang="ts">
const modelValue = defineModel<number>();

// function onBlur(e: FocusEvent) {
//   const v = (e.target as HTMLInputElement).value;
//   console.log(v);

//   const newValue = v ? Number.parseFloat(v.replaceAll(/\s/g, "").replaceAll(",", ".")) : undefined;
//   console.log(newValue);

//   if (modelValue.value === newValue)
//     return;
//   modelValue.value = newValue;
// }

// :loading="nicknameLoadings[original.id]"
</script>

<template>
  <UInputNumber
    v-model="modelValue"
    class="absolute inset-0" :ui="{ base: 'text-right !text-base-sm font-medium p-3 rounded-none' }"
    variant="ghost"
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
