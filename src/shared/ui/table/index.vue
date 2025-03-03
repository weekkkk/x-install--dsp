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
  if (!props.radio) return _columns.value;
  return [{ key: "radio" }, ..._columns.value];
});

const selected = defineModel<string>();

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
  <UTable :columns="mapedColumns" :rows="rows">
    <template #radio-data="{ row }">
      <URadio v-model="selected" :value="row[by]" />
    </template>

    <template
      v-for="key in editableCols"
      :key="key"
      v-slot:[`${key.toString()}-data`]="{ row }"
    >
      <UInput
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
