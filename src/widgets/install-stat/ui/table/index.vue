<script setup lang="ts">
import type { InstallStatTableWidgetProps } from "./interfaces";

const props = defineProps<InstallStatTableWidgetProps>();

const user = useAuthApiUser();

const { data: installStats } = useAsyncData("install-stat-list", async () => {
  if (!user.value)
    throw new Error("Нет юзера");

  const UserId = props.userId ?? user.value.id;

  const data = await InstallStatApiService.getAll({ UserId });
  if (props.mode === "create")
    data.userStatistics.unshift({ id: -1 });
  return data;
}, { default: () => ({ userStatistics: [] }) });

const columns: EditableTableColumn<InstallStatResDto>[] = [
  {
    accessorKey: "date",
    header: "date",
    type: "date",
    editable: true,
  },
  {
    accessorKey: "total",
    type: "number",
    editable: true,
  },
  {
    accessorKey: "appLink",
    header: "app link",
    type: "string",
    editable: true,
  },
  {
    accessorKey: "appName",
    header: "app name",
    type: "string",
    editable: true,
  },
  {
    accessorKey: "region",
    type: "string",
    editable: true,
  },
  {
    accessorKey: "keywords",
    type: "string-array",
    editable: true,
  },
  {
    accessorKey: "totalInstall",
    header: "total install",
    type: "number",
    editable: true,
  },
  {
    accessorKey: "complited",
    header: "% complited",
    type: "percent",
    editable: true,
  },
];

function onChange(id: number, key: keyof InstallStatResDto, value: any) {
  InstallStatApiService.change({ id, key, value });
}

const _mode = computed(() => {
  if (props.mode === "create")
    return "view";
  return props.mode;
});

const selectedIds = defineModel<number[]>({ default: () => [] });
</script>

<template>
  <UiEditableTable v-model="selectedIds" class="-mt-3" :mode="_mode" :columns="columns" :rows="installStats.userStatistics" @change="onChange" />
</template>
