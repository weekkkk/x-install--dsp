<script setup lang="ts">
import type { ButtonSelectProps } from "./interfaces";

const props = withDefaults(defineProps<ButtonSelectProps>(), { selectedColor: "neutral" });

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
          class="whitespace-nowrap"
          @click="model = value"
        >
          {{ label }}
        </UButton>
      </div>
    </template>

    <div class="inline-flex">
      <UButton v-if="!option || !option.mdIcon" size="sm" :class="{ 'max-md:hidden': option?.mdIcon }" :color="selectedColor" class="whitespace-nowrap">
        {{ option?.label ?? 'Select' }}
      </UButton>
      <UButton v-else-if="option" size="sm" :class="{ 'md:hidden': option.mdIcon, 'hidden': !option.mdIcon }" :color="selectedColor" :icon="option.mdIcon" />
    </div>
  </UPopover>
</template>
