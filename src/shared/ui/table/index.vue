<script
  setup
  lang="ts"
  generic="T extends {
  [key: string]: any;
}"
>
import type { TUiTableProps } from "./types";

const props = withDefaults(defineProps<TUiTableProps<T>>(), {
  customizeCols: [] as any,
  editableCols: [] as any,
});

const _columns = computed(() =>
  props.columns.map(({ key, label }) => ({
    key: key.toString(),
    label: label || key,
  }))
);

const mapedColumns = computed(() => {
  const add = [];
  if (props.isRadio) add.push({ key: "radio" });

  if (props.isCheckbox) add.push({ key: "checkbox" });
  return [...add, ..._columns.value];
});

const radioSelected = defineModel<string | number | undefined>("radio");
const multiSelected = defineModel<(string | number)[] | undefined>("checkbox");

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
  <UTable
    class="p-16 bg-dark-50 rounded-t-[2rem] grow"
    by="id"
    :columns="mapedColumns"
    :rows="rows"
    :loading="loading"
  >
    <template #radio-data="{ row }">
      <URadio
        class="h-[1.2rem]"
        name="radio"
        v-model="radioSelected"
        :value="row[by]"
      />
    </template>
    <template #checkbox-data="{ row }">
      <UCheckbox
        class="h-[1.2rem]"
        :ui="{ base: 'h-[2.4rem] w-[2.4rem]', rounded: 'rounded-2xl' }"
        name="radio"
        :value="row[by]"
        v-model="multiSelected"
      />
    </template>

    <template
      v-for="key in editableCols"
      :key="key"
      v-slot:[`${key.toString()}-data`]="{ row }"
    >
      <UInput
        :ui="{ padding: { sm: 'p-0 h-[4.2rem]' } }"
        class="-my-6"
        :model-value="row[key]"
        variant="none"
        @focus="onFocus"
        @blur="onBlur($event, row, key)"
        :readonly="readonly"
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
