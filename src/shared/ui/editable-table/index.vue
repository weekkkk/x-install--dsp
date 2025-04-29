<script setup lang="ts" generic="Row extends EditableTableRow<keyof Row>">
import type { TableColumn } from "@nuxt/ui";
import type { EditableTableProps, EditableTableRow } from "./interfaces";
import type { EditableTableColumn, EditableTableColumnDataType } from "./types";

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

// function getComponent(type: EditableTableColumnDataType) {
//   switch (type) {
//     case "string":
//       return UiEditableTableString;
//   }
// }

// const stringEditableCols = computed(() => )

// const nicknameLoadings = reactive<Record<number, boolean>>({});

// function onBlur(e: FocusEvent, original: UserResDto) {
//   const newValue = (e.target as HTMLInputElement).value;
//   if (original.username === newValue)
//     return;
//   changeNickname(original, newValue);
// }

// async function changeNickname(original: UserResDto, name: string) {
//   const id = original.id;
//   const oName = original.username;
//   try {
//     original.username = name;
//     nicknameLoadings[id] = true;
//     await UserApiService.changeName({ id, name });
//   }
//   catch {
//     original.username = oName;
//   }
//   finally {
//     nicknameLoadings[id] = false;
//   }
// }
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
      <UiEditableTableDate v-if="column.type === 'date'" :model-value="(row.original[column.accessorKey] as string)" />
      <UiEditableTableString v-if="column.type === 'string'" :model-value="(row.original[column.accessorKey] as string)" />
      <UiEditableTableNumber v-if="column.type === 'number'" :model-value="(row.original[column.accessorKey] as number)" />
      <UiEditableTablePercent v-if="column.type === 'percent'" :model-value="(row.original[column.accessorKey] as number)" />
    </template>
    <!-- <template #username-cell="{ row: { original } }">
      <UInput
        :model-value="original.username" :ui="{ base: 'text-right text-base-sm font-medium p-3 rounded-none', root: '-m-3' }"
        variant="ghost"
        :loading="nicknameLoadings[original.id]"
        @blur="onBlur($event, original)"
      />
    </template>
    <template #unlocked-cell="{ row: { original } }">
      <div class="flex justify-end">
        <UserPanelEditorFeature
          :id="original.id"
          :default-values="{
            isXInstallApp: original.isXInstallApp,
            isDsp: original.isDsp,
            isDspInApp: original.isDspInApp,
            isDspBanner: original.isDspBanner,
          }"
        />
      </div>
    </template> -->
  </UTable>
</template>
