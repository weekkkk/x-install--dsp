<script setup lang="ts">
import type { EditableTableFieldProps } from "../../interfaces";

defineProps<EditableTableFieldProps>();

const modelValue = defineModel<string[]>({ default: () => [] });

const items = ref([...modelValue.value]);

const searchTerm = ref<string>();

function onCreate(item: string) {
  items.value.push(item);
  searchTerm.value = undefined;
}
function onDelete(index: number) {
  items.value.splice(index, 1);
}

const open = ref(false);

watch(modelValue, (v) => {
  items.value = [...v];
});

watch(open, (v) => {
  if (v)
    return;
  modelValue.value = [...items.value];
});
</script>

<template>
  <USelectMenu
    v-model:open="open"
    v-model:search-term="searchTerm"
    :model-value="items"
    :placeholder="placeholder"
    :ui="{
      base: 'rounded-none font-medium justify-end',
      content: 'bg-neutral-900 ring-0 rounded-2xl',
      itemTrailingIcon: 'hidden',
      group: 'px-5 py-0 divide-y divide-neutral-800',
      input: 'border-none pt-2.5 [&>input]:px-5 [&>input]:py-2.5 [&>input]:!text-base-sm [&>input]:font-medium',
      item: 'group before:-mx-5 before:rounded-none before:inset-0 py-2.5 first:border-t border-neutral-800 !text-base-sm',
      viewport: 'divide-none pb-2.5',
      empty: 'border-t border-neutral-800 mx-5',
    }"
    variant="none"
    multiple
    :create-item="{ position: 'top', when: 'always' }"
    :items="items"
    :class="{
      'bg-neutral-800': open,
    }"
    class="absolute inset-0 hover:bg-neutral-800"
    @create="onCreate"
  >
    <template #trailing>
      <UIcon name="xii:top" class="text-lg transition-transform" :class="{ 'rotate-180': !open }" />
    </template>

    <template #item-trailing="{ index }">
      <UButton
        size="xs" color="neutral" variant="ghost"
        icon="xii:trash"
        class="opacity-0 group-hover:opacity-100 -my-1.5"
        @click="onDelete(index)"
      />
    </template>

    <template #empty>
      <div class="text-white/20 text-base-sm py-0.5">
        No data, search and create item
      </div>
    </template>
  </USelectMenu>
</template>
