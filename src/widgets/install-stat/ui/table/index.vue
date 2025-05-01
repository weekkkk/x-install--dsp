<script setup lang="ts">
// import type { TableColumn } from "@nuxt/ui";
import type { InstallStatTableWidgetProps } from "./interfaces";
import { format } from "date-fns";

const props = defineProps<InstallStatTableWidgetProps>();

const user = useAuthApiUser();

const { data: installStats } = useAsyncData("install-stat-list", () => {
  if (!user.value)
    throw new Error("Нет юзера");

  const UserId = props.userId ?? user.value.id;

  return InstallStatApiService.getAll({ UserId });
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
</script>

<template>
  <UiEditableTable :columns="columns" :rows="installStats.userStatistics" />
</template>
