<script setup lang="ts">
const modelValue = defineModel<string>({ default: "" });

function onBlur(e: FocusEvent) {
  const newValue = (e.target as HTMLInputElement).value;
  if (modelValue.value === newValue)
    return;
  modelValue.value = newValue;
}

// :loading="nicknameLoadings[original.id]"
</script>

<template>
  <UInput
    class="absolute inset-0"
    :model-value="modelValue" :ui="{ base: 'text-right text-base-sm font-medium p-3 rounded-none' }"
    variant="ghost"
    @blur="onBlur"
  />
</template>
