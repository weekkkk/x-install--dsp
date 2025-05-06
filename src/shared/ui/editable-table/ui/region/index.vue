<script setup lang="ts">
import type { EditableTableFieldProps } from "../../interfaces";

defineProps<EditableTableFieldProps>();

const modelValue = defineModel<string[]>({ default: () => [] });

const items = ref([...countryCodes]);
</script>

<template>
  <USelectMenu
    v-if="!readonly"
    v-model="modelValue"
    :placeholder="placeholder"
    :ui="{
      base: 'rounded-none font-medium justify-end',
      content: 'bg-neutral-900 ring-0 rounded-2xl max-md:min-w-75',
      itemTrailingIcon: 'hidden',
      group: 'px-5 py-0 divide-y divide-neutral-800',
      input: 'border-none pt-2.5 [&>input]:px-5 [&>input]:py-2.5 [&>input]:!text-base-sm [&>input]:font-medium',
      item: 'group before:-mx-5 before:rounded-none before:inset-0 py-2.5 first:border-t border-neutral-800 !text-base-sm aria-selected:before:bg-neutral-800/50',
      viewport: 'divide-none pb-2.5',
      empty: 'border-t border-neutral-800 mx-5',
    }"
    variant="none"
    multiple
    :items="items"
    class="absolute inset-0"
  >
    <template #trailing="{ open }">
      <UIcon name="xii:top" class="text-lg transition-transform" :class="{ 'rotate-180': !open }" />
    </template>

    <template #empty>
      <div class="text-white/20 text-base-sm py-0.5">
        No data
      </div>
    </template>
  </USelectMenu>
  <UiEditableTableStringArray
    v-else
    :model-value="modelValue"
    :readonly="readonly"
  />
</template>
