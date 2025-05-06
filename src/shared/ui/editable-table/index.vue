<script setup lang="ts" generic="Row extends EditableTableRow = EditableTableRow & Partial<Record<string, EditableTableColumnData>>">
import type { TableColumn } from "@nuxt/ui";
import type { EditableTableEmits, EditableTableProps, EditableTableRow } from "./interfaces";
import type { EditableTableColumn, EditableTableColumnData } from "./types";

const props = withDefaults(defineProps<EditableTableProps<Row>>(), { mode: "view", customColumns: () => [] });

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

const table = useTemplateRef("table");

const editableColumns = computed(() => props.columns.filter((c): c is EditableTableColumn<Row> => !!c.editable));
function onUpdateModelValue(r: Row, key: keyof Row, value?: EditableTableColumnData) {
  emit("change", r.id, key, value);

  r[key] = value as Row[keyof Row];
}

function setTotalRow(total?: typeof props.totalRow) {
  const table = document.querySelector("#table table");
  if (!table)
    return;

  // Удалим старый tfoot если есть
  const oldFoot = table.querySelector("tfoot");
  if (oldFoot)
    oldFoot.remove();
  if (!total)
    return;

  const tfoot = document.createElement("tfoot");
  tfoot.classList.add();
  const row = document.createElement("tr");
  row.classList.add("sticky", "bottom-0", "z-10");
  [..._columns.value, ...props.customColumns].forEach((col) => {
    const accessorKey = (col as { accessorKey: string }).accessorKey;
    const td = document.createElement("td");
    if (total[accessorKey]) {
      td.textContent = total[accessorKey];
      td.classList.add("text-right", "first:text-left", "p-3", "text-base-sm", "text-white", "font-medium", "bg-neutral-900/90");
    }
    else {
      td.classList.add("bg-neutral-900/60");
    }
    row.appendChild(td);
  });

  if (props.hasAction) {
    const row2 = document.createElement("tr");
    [..._columns.value, ...props.customColumns].forEach(() => {
      const td = document.createElement("td");
      td.classList.add("h-15", "max-md:h-0");
      row2.appendChild(td);
    });
    tfoot.appendChild(row2);
  }
  tfoot.appendChild(row);
  table.appendChild(tfoot);
}

onMounted(() => {
  setTotalRow(props.totalRow);
});

watch(() => props.totalRow, (total) => {
  setTotalRow(total);
});
</script>

<template>
  <UTable
    id="table"
    ref="table"
    v-model:row-selection="rowSelection"
    :get-row-id="(row) => row.id.toString()"
    class="grow shrink !overflow-visible max-md:min-h-fit max-md:!overflow-auto"
    :ui="{ base: 'max-md:mx-5 min-h-full after:h-full after:table-row-group', th: 'not-[:first-child]:text-right whitespace-nowrap', td: 'not-[:first-child]:text-right relative' }"
    :data="rows"
    :loading="loading"
    :columns="[..._columns, ...customColumns] as typeof _columns"
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
      <UiEditableTableStringNumberDeepArray
        v-else-if="column.type === 'string-number-deep-array'"
        :model-value="(row.original[column.accessorKey] as [string, number | undefined][])"
        :placeholder="column.header ?? column.accessorKey"
        :readonly="column.readonly"
        @update:model-value="onUpdateModelValue(row.original, column.accessorKey, $event)"
      />
    </template>

    <template v-for="customColumn in customColumns" :key="customColumn.accessorKey" #[`${customColumn.accessorKey.toString()}-cell`]="{ row }">
      <slot :name="`${customColumn.accessorKey}-cell`" :row="row" />
    </template>
  </UTable>
</template>
