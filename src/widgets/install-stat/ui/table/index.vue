<script setup lang="ts">
import type { InstallStatTableWidgetProps } from "./interfaces";
import { format, startOfToday, startOfTomorrow } from "date-fns";

const props = withDefaults(defineProps<InstallStatTableWidgetProps>(), {
  dateRange: () => {
    return { start: startOfToday(), end: startOfTomorrow() };
  },
});

const user = useAuthApiUser();

const { data: installStats, status } = useAsyncData("install-stat-list", async () => {
  if (!user.value)
    throw new Error("Нет юзера");

  const UserId = props.userId ?? user.value.id;
  const { start, end } = props.dateRange;

  const data = await InstallStatApiService.getAll({
    UserId,
    StartDate: start.toISOString(),
    EndDate: end.toISOString(),
  });
  if (props.mode === "create")
    data.userStatistics.unshift({ id: -1 });
  return data;
}, {
  default: () => ({ userStatistics: [] }),
  watch: [() => props.dateRange],
});

const n = new Intl.NumberFormat("ru-RU");
const p = new Intl.NumberFormat("ru-RU", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const columns = computed((): EditableTableColumn<InstallStatResDto>[] => [
  {
    accessorKey: "date",
    header: "date",
    type: "date",
    editable: !props.readonly,
    cell: ({ row }) => {
      const v = row.getValue<string | undefined>("date");
      if (!v)
        return;
      return format(v, "dd.MM.yy");
    },
  },
  {
    accessorKey: "total",
    type: "number",
    editable: !props.readonly,
    cell: ({ row }) => {
      const v = row.getValue<number | undefined>("total");
      if (!v)
        return;
      return n.format(v);
    },
  },
  {
    accessorKey: "appLink",
    header: "app link",
    type: "string",
    editable: !props.readonly,
  },
  {
    accessorKey: "appName",
    header: "app name",
    type: "string",
    editable: !props.readonly,
  },
  {
    accessorKey: "region",
    type: "string",
    editable: !props.readonly,
  },
  {
    accessorKey: "keywords",
    type: "string-array",
    editable: !props.readonly,
    cell: ({ row }) => row.getValue<string[] | undefined>("keywords")?.join(", "),
  },
  {
    accessorKey: "totalInstall",
    header: "total install",
    type: "number",
    editable: !props.readonly,
    cell: ({ row }) => {
      const v = row.getValue<number | undefined>("totalInstall");
      if (!v)
        return;
      return n.format(v);
    },
  },
  {
    accessorKey: "complited",
    header: "% complited",
    type: "percent",
    editable: !props.readonly,
    cell: ({ row }) => {
      const v = row.getValue<number | undefined>("complited");
      if (!v)
        return;
      return p.format(v);
    },
  },
]);

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
  <UiEditableTable
    v-model="selectedIds" class="-mt-3"
    :loading="status === 'pending'"
    :mode="_mode" :columns="columns" :rows="installStats.userStatistics" @change="onChange"
  />
</template>
