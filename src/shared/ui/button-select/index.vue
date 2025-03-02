<script setup lang="ts">
import type { TUiButtonSelectOption, TUiButtonSelectProps } from "./types";

const props = defineProps<TUiButtonSelectProps>();

const model = defineModel<TUiButtonSelectOption>();
const _options = computed(() =>
  model.value
    ? props.options.filter(({ key }) => key !== model.value?.key)
    : props.options
);
</script>

<template>
  <USelectMenu
    v-model="model"
    :options="_options"
    :popper="{ offsetDistance: 0 }"
    variant="none"
    :ui-menu="{
      padding: 'p-0',
      background: 'dark:bg-[transparent]',
      ring: 'ring-0',
      option: {
        base: 'mt-2',
        padding: 'p-0',
        rounded: 'rounded-full',
      },
      height: 'max-h-80',
    }"
    class="max-h-3"
  >
    <UButton color="gray" class="w-32">
      {{ model?.label }}
    </UButton>
    <template #option="{ option }">
      <UButton color="gray" class="w-32" v-if="!option.disabled">
        {{ option.label }}
      </UButton>
      <span v-else></span>
    </template>
  </USelectMenu>
</template>
