<script setup lang="ts">
import type { InstallStatTableWidgetProps } from "./interfaces";
import { format, startOfToday, startOfTomorrow } from "date-fns";

const props = withDefaults(defineProps<InstallStatTableWidgetProps>(), {
  dateRange: () => {
    return { start: startOfToday(), end: startOfTomorrow() };
  },
});

const user = useAuthApiUser();

const { data: installStats, status, refresh } = useAsyncData("install-stat-list", async () => {
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
  default: () => ({ userStatistics: [], total: { total: 0, totalInstall: 0 }, totalAllTime: 0 } as Awaited<ReturnType<typeof InstallStatApiService.getAll>>),
  watch: [() => props.dateRange],
  dedupe: "defer",
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
    type: "region",
    editable: !props.readonly,
  },
  {
    accessorKey: "keywordsWithTotalInstall",
    header: "keywords",
    type: "string-number-deep-array",
    editable: true,
    readonly: props.readonly,
    cell: ({ row }) => row.getValue<[string, number | undefined][] | undefined>("keywordsWithTotalInstall")?.map(([key]) => key).join(", "),
  },
  {
    accessorKey: "totalInstall",
    header: "total install",
    editable: true,
    type: "number",
    readonly: props.readonly,
    cell: ({ row }) => {
      const v = row.getValue<[string, number | undefined][] | undefined>("keywordsWithTotalInstall")?.reduce((acc, [,v]) => acc + (v || 0), 0);
      if (v === undefined)
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
      return p.format(v / 100);
    },
  },
]);

async function onChange(id: number, key: keyof InstallStatResDto, value: any) {
  if (id !== -1) {
    await InstallStatApiService.change({ id, key, value });
    if (typeof value === "number")
      refresh();
  }
  if (key === "keywordsWithTotalInstall") {
    installStats.value.userStatistics = [...installStats.value.userStatistics];
  }
}

const _mode = computed(() => {
  if (props.mode === "create")
    return "view";
  return props.mode;
});

const selectedIds = defineModel<number[]>({ default: () => [] });

const total = computed(() => {
  const { total, totalInstall, totalIntasll } = installStats.value.total as any;
  const _totalInstall = totalInstall ?? totalIntasll;
  return ({
    date: "Total",
    total: total || total === 0 ? n.format(total) : undefined,
    totalInstall: n.format(installStats.value.userStatistics.reduce((acc, { totalInstall }) => acc + (totalInstall ?? 0), 0)),
  });
});
</script>

<template>
  <UiEditableTable
    v-model="selectedIds" class="-mt-3"
    :total-row="total"
    :has-action="!readonly"
    :loading="status === 'pending'"
    :mode="_mode" :columns="columns" :rows="installStats.userStatistics" @change="onChange"
  />
</template>
