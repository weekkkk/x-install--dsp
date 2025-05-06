<script setup lang="ts">
import type { EditableTableFieldProps } from "../../interfaces";

type Item = [key: string, totalInstall: number | undefined];
type ItemsObj = Record<string, number | undefined>;

defineProps<EditableTableFieldProps>();

function mapItemToObj([key, totalInstall]: Item) {
  return { [key]: totalInstall };
}

function mapItemsToObj(items: Item[]) {
  return items.reduce((acc, item) => ({ ...acc, ...mapItemToObj(item) }), {} as ItemsObj);
}

const modelValue = defineModel<Item[], string, ItemsObj, ItemsObj>({ default: () => [], get(v) {
  return mapItemsToObj(v);
}, set(v) {
  return Object.entries(v);
} });

const items = computed(() => Object.keys(modelValue.value));

const searchTerm = ref<string>();

function onCreate(key: string) {
  modelValue.value = { ...modelValue.value, [key]: undefined };
  searchTerm.value = undefined;
}
function onDelete(key: string) {
  modelValue.value = Object.fromEntries(Object.entries(modelValue.value).filter(([_key]) => _key !== key));
}
</script>

<template>
  <USelectMenu
    v-model:search-term="searchTerm"
    :model-value="items"
    :placeholder="placeholder"
    :ui="{
      base: 'rounded-none font-medium justify-end',
      content: 'bg-neutral-900 ring-0 rounded-2xl max-md:min-w-75',
      itemTrailingIcon: 'hidden',
      group: 'px-5 py-0 divide-y divide-neutral-800',
      input: 'border-none pt-2.5 [&>input]:px-5 [&>input]:py-2.5 [&>input]:!text-base-sm [&>input]:font-medium',
      item: 'group before:-mx-5 before:rounded-none before:inset-0 py-2.5 first:border-t border-neutral-800 !text-base-sm',
      viewport: 'divide-none pb-2.5',
      empty: 'border-t border-neutral-800 mx-5',
      itemLabel: 'w-full',
    }"
    variant="none"
    multiple
    :create-item="{ position: 'top', when: 'always' }"
    :items="items"
    class="absolute inset-0"
    @create="onCreate"
  >
    <template #trailing="{ open }">
      <UIcon name="xii:top" class="text-lg transition-transform" :class="{ 'rotate-180': !open }" />
    </template>

    <template #item-label="{ item: key }">
      <div class="flex w-full">
        {{ key }}
        <span class="ml-3">
          -
        </span>
        <div class="relative w-full">
          <UiEditableTableNumber :model-value="modelValue[key]" placeholder="total install" align="left" @update:model-value="modelValue = { ...modelValue, [key]: $event }" />
        </div>
      </div>
    </template>

    <template #item-trailing="{ item: key }">
      <UButton
        size="xs" color="neutral" variant="ghost"
        icon="xii:trash"
        class="opacity-0 group-hover:opacity-100 group-data-highlighted:opacity-100 -my-1.5"
        @click="onDelete(key)"
      />
    </template>

    <template #empty>
      <div class="text-white/20 text-base-sm py-0.5">
        No data, search and create item
      </div>
    </template>
  </USelectMenu>
</template>
