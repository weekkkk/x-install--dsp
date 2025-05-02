<script setup lang="ts" generic="Row extends EditableTableRow = EditableTableRow & Partial<Record<string, EditableTableColumnData>>">
import type { TableColumn } from "@nuxt/ui";
import type { EditableTableEmits, EditableTableProps, EditableTableRow } from "./interfaces";
import type { EditableTableColumn, EditableTableColumnData } from "./types";

const props = withDefaults(defineProps<EditableTableProps<Row>>(), { mode: "view" });

const emit = defineEmits<EditableTableEmits<Row>>();

const UCheckbox = resolveComponent("UCheckbox");

const selectedIds = defineModel<number[]>({ default: () => [] });

const rowSelection = computed<Record<string, boolean>>({
  get: () => {
    return selectedIds.value.reduce((acc, id) => ({ ...acc, [id.toString()]: true }), {});
  },
  set: (v) => {
    selectedIds.value = Object.entries(v).filter(([,v]) => v).map(([k]) => Number(k));
  },
});

const _columns = computed((): [TableColumn<Row>, ...EditableTableColumn<Row>[]] | EditableTableColumn<Row>[] => {
  switch (props.mode) {
    case "select":
      return [{
        id: "select",
        cell: ({ row }) =>
          h(UCheckbox, {
            "modelValue": row.getIsSelected(),
            "onUpdate:modelValue": (value: boolean | "indeterminate") => {
              const v = !!value;
              const key = row.id.toString();
              rowSelection.value = { [key]: v };
            },
            "aria-label": "Select row",
            "ui": { container: "h-6", base: "size-6 rounded-xl" },
            "class": "-m-0.75",
          }),
      }, ...props.columns];
    case "multi-select":
      return [{
        id: "select",
        cell: ({ row }) =>
          h(UCheckbox, {
            "modelValue": row.getIsSelected(),
            "onUpdate:modelValue": (value: boolean | "indeterminate") => row.toggleSelected(!!value),
            "aria-label": "Select row",
            "ui": { container: "h-6", base: "size-6 rounded-xl" },
            "class": "-m-0.75",
          }),
      }, ...props.columns];
    case "delete":
      return [{
        id: "select",
        cell: ({ row }) =>
          h(UCheckbox, {
            "color": "error",
            "modelValue": row.getIsSelected(),
            "onUpdate:modelValue": (value: boolean | "indeterminate") => row.toggleSelected(!!value),
            "aria-label": "Select row",
            "ui": { container: "h-6", base: "size-6 rounded-xl" },
            "class": "-m-0.75",
          }),
      }, ...props.columns];
    default:
      return props.columns;
  }
});

const editableColumns = computed(() => props.columns.filter((c): c is EditableTableColumn<Row> => !!c.editable));
function onUpdateModelValue(r: Row, key: keyof Row, value?: EditableTableColumnData) {
  if (r.id !== -1)
    emit("change", r.id, key, value);

  r[key] = value as Row[keyof Row];
}
</script>

<template>
  <UTable
    v-model:row-selection="rowSelection"
    :get-row-id="(row) => row.id.toString()"
    :ui="{ base: 'max-md:mx-5', th: 'not-[:first-child]:text-right whitespace-nowrap', td: 'not-[:first-child]:text-right relative' }"
    :data="rows"
    :columns="_columns"
  >
    <template v-for="column in editableColumns" :key="column.accessorKey" #[`${column.accessorKey.toString()}-cell`]="{ row }">
      <UiEditableTableDate
        v-if="column.type === 'date'"
        :model-value="(row.original[column.accessorKey] as string)"
        :placeholder="column.header ?? column.accessorKey"
        @update:model-value="onUpdateModelValue(row.original, column.accessorKey, $event)"
      />
      <UiEditableTableString
        v-else-if="column.type === 'string'"
        :model-value="(row.original[column.accessorKey] as string)"
        :placeholder="column.header ?? column.accessorKey"
        @update:model-value="onUpdateModelValue(row.original, column.accessorKey, $event)"
      />
      <UiEditableTableNumber
        v-else-if="column.type === 'number'"
        :model-value="(row.original[column.accessorKey] as number)"
        :placeholder="column.header ?? column.accessorKey"
        @update:model-value="onUpdateModelValue(row.original, column.accessorKey, $event)"
      />
      <UiEditableTablePercent
        v-else-if="column.type === 'percent'"
        :model-value="(row.original[column.accessorKey] as number)"
        :placeholder="column.header ?? column.accessorKey"
        @update:model-value="onUpdateModelValue(row.original, column.accessorKey, $event)"
      />
      <UiEditableTableStringArray
        v-else-if="column.type === 'string-array'"
        :model-value="(row.original[column.accessorKey] as string[])"
        :placeholder="column.header ?? column.accessorKey"
        @update:model-value="onUpdateModelValue(row.original, column.accessorKey, $event)"
      />
    </template>
  </UTable>
</template>
