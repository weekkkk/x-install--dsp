<script setup lang="ts">
import type { ButtonSelectProps } from "./interfaces";

defineProps<ButtonSelectProps>();

const model = defineModel<string>();
</script>

<template>
  <div class="flex gap-5 max-md:gap-2.25">
    <UButton
      v-for="{ value, label } in tabs" :key="value"
      class="whitespace-nowrap"
      size="sm"
      :color="value !== model ? 'neutral' : 'primary'"
      :ghost="value !== model"
      @click="model = value"
    >
      {{ label }}
    </UButton>
  </div>
</template>
