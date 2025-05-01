<script setup lang="ts" generic="Row extends EditableTableRow<keyof Row>">
import type { TableColumn } from "@nuxt/ui";
import type { EditableTableProps, EditableTableRow } from "./interfaces";
import type { EditableTableColumn } from "./types";

const props = withDefaults(defineProps<EditableTableProps<Row>>(), { mode: "view" });

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

const editableColumns = computed(() => props.columns.filter((c): c is Extract<EditableTableColumn<Row>, { editable: true }> => !!c.editable));
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
        :placeholder="column.header?.toString() ?? column.accessorKey"
      />
      <UiEditableTableString
        v-else-if="column.type === 'string'"
        :model-value="(row.original[column.accessorKey] as string)"
        :placeholder="column.header?.toString() ?? column.accessorKey"
      />
      <UiEditableTableNumber
        v-else-if="column.type === 'number'"
        :model-value="(row.original[column.accessorKey] as number)"
        :placeholder="column.header?.toString() ?? column.accessorKey"
      />
      <UiEditableTablePercent
        v-else-if="column.type === 'percent'"
        :model-value="(row.original[column.accessorKey] as number)"
        :placeholder="column.header?.toString() ?? column.accessorKey"
      />
      <UiEditableTableStringArray
        v-else-if="column.type === 'string-array'"
        :model-value="(row.original[column.accessorKey] as string[])"
        :placeholder="column.header?.toString() ?? column.accessorKey"
      />
    </template>
  </UTable>
</template>
