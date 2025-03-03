<script
  setup
  lang="ts"
  generic="T extends {
  [key: string]: any;
}"
>
import type { TUiTableProps } from "./types";

const props = withDefaults(defineProps<TUiTableProps<T>>(), {
  customizeCols: [],
  editableCols: [],
});

const _columns = computed(() =>
  props.columns.map(({ key, label }) => ({
    key: key.toString(),
    label: label || key,
  }))
);

const mapedColumns = computed(() => {
  if (!props.isRadio) return _columns.value;
  return [{ key: "radio" }, ..._columns.value];
});

const radioSelected = defineModel<string | undefined>("radio", {});
const multiSelected = defineModel<T[] | undefined>("checkbox", {
  get: (v) => (props.isCheckbox ? v || [] : undefined),
});

const emit = defineEmits<{
  change: [{ row: T; key: keyof T; value: string }];
}>();

const oldValue = ref("");
const onFocus = ({ currentTarget }: FocusEvent) => {
  if (!currentTarget) return;
  oldValue.value = (currentTarget as HTMLInputElement).value;
};
const onBlur = ({ currentTarget }: FocusEvent, row: T, key: keyof T) => {
  if (!currentTarget) return;
  const value = (currentTarget as HTMLInputElement).value;
  if (oldValue.value === value) return;
  emit("change", { row, key, value });
};
</script>

<template>
  <UTable by="id" v-model="multiSelected" :columns="mapedColumns" :rows="rows">
    <template #radio-data="{ row }">
      <URadio v-model="radioSelected" :value="row[by]" />
    </template>
    <template #select-header="{ checked, change }">
      <UCheckbox
        :ui="{ base: 'h-[2.4rem] w-[2.4rem]', rounded: 'rounded-2xl' }"
        :model-value="checked"
        @update:model-value="change"
      />
    </template>
    <template #select-data="{ checked, change }">
      <UCheckbox
        :ui="{ base: 'h-[2.4rem] w-[2.4rem]', rounded: 'rounded-2xl' }"
        :model-value="checked"
        @update:model-value="change"
      />
    </template>

    <template
      v-for="key in editableCols"
      :key="key"
      v-slot:[`${key.toString()}-data`]="{ row }"
    >
      <UInput
        :ui="{ padding: { sm: 'p-0 h-[4.2rem]' } }"
        :key="row[by]"
        class="-my-6"
        variant="none"
        :model-value="row[key]"
        @focus="onFocus"
        @blur="onBlur($event, row, key)"
      />
    </template>

    <template
      v-for="key in customizeCols"
      :key="key"
      v-slot:[`${key.toString()}-data`]="{ row }"
    >
      <slot :name="`${key.toString()}-data`" :row="row" />
    </template>
  </UTable>
</template>
