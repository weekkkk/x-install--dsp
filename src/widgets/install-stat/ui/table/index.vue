<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { InstallStatTableWidgetProps } from "./interfaces";
import { format } from "date-fns";

const props = defineProps<InstallStatTableWidgetProps>();

const UCheckbox = resolveComponent("UCheckbox");

const user = useAuthApiUser();

const { data } = useAsyncData("install-stat-list", () => {
  if (!user.value)
    throw new Error("Нет юзера");

  const UserId = props.userId ?? user.value.id;

  return InstallStatApiService.getAll({ UserId });
});

const selectedInstallStatIds = defineModel<InstallStatResDto["id"][]>({ default: () => [] });

const rowSelection = computed<Record<string, boolean>>({
  get: () => {
    return selectedInstallStatIds.value.reduce((acc, id) => ({ ...acc, [id.toString()]: true }), {});
  },
  set: (v) => {
    selectedInstallStatIds.value = Object.entries(v).filter(([,v]) => v).map(([k]) => Number(k));
  },
});

const defaultColumns: TableColumn<InstallStatResDto>[] = [
  {
    accessorKey: "date",
    header: "date",
    cell: ({ row }) => `${format(row.getValue<string>("createdAt"), "dd.MM.yy")}`,
  },
  {
    accessorKey: "total",
  },
  {
    accessorKey: "appLink",
    header: "app link",
  },
  {
    accessorKey: "appName",
    header: "app name",
  },
  {
    accessorKey: "region",
  },
  {
    accessorKey: "keywords",
  },
  {
    accessorKey: "totalInstall",
    header: "total install",
  },
  {
    accessorKey: "complited",
    header: "% complited",
  },
];

const columns = computed(() => {
  switch (props.mode) {
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
      }, ...defaultColumns];
    default:
      return defaultColumns;
  }
});

const stringEditableColumns: (keyof InstallStatResDto)[] = ["total", "appLink", "appName", "region"];

const loadings = reactive<Record<keyof InstallStatResDto, Record<string | string>>>();
</script>

<template>
  {{ data }}
  <h1>test</h1>
  <UTable
    v-model:row-selection="rowSelection"
    :get-row-id="(row) => row.id.toString()"
    :ui="{ base: 'max-md:mx-5', th: 'not-[:first-child]:text-right whitespace-nowrap', td: 'not-[:first-child]:text-right' }" :data="users" :columns="columns"
  >
    <template
      v-for="col in stringEditableColumns"
      :key="col"
      #[`${col.toString()}-cell`]="{ row: { original } }"
    >
      <UInput
        :model-value="original[col]?.toString()" :ui="{ base: 'text-right text-base-sm font-medium p-3 rounded-none', root: '-m-3' }"
        variant="ghost"
        :loading="loadings[col][original.id]"
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
    </template>
  </UTable>
</template>
