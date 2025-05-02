<script setup lang="ts">
import type { ButtonSelectProps } from "./interfaces";

const props = defineProps<ButtonSelectProps>();

const model = defineModel<string>();

const _options = computed(() => model.value ? props.options.filter(({ value }) => value !== model.value) : props.options);
const option = computed(() => props.options.find(({ value }) => value === model.value));
</script>

<template>
  <UPopover :ui="{ content: 'ring-0 bg-transparent' }" :content="{ sideOffset: 0 }">
    <template #content>
      <div class="flex flex-col mt-1.25 gap-1.25">
        <UButton
          v-for="{ value, label } in _options" :key="value"
          size="sm" color="neutral"
          @click="model = value"
        >
          {{ label }}
        </UButton>
      </div>
    </template>

    <UButton size="sm" color="neutral">
      {{ option?.label ?? 'Select' }}
    </UButton>
  </UPopover>
</template>
