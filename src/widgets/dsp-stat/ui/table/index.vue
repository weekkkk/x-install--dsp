<script setup lang="ts">
import type { DspStatTableWidgetProps } from "./interfaces";
import { format, startOfToday, startOfTomorrow } from "date-fns";

const props = withDefaults(defineProps<DspStatTableWidgetProps>(), {
  dateRange: () => {
    return { start: startOfToday(), end: startOfTomorrow() };
  },
});

const user = useAuthApiUser();

const { data: dspStats, status } = useAsyncData(`${props.panel}-stat-list`, async () => {
  if (!user.value)
    throw new Error("Нет юзера");

  const UserId = props.userId ?? user.value.id;
  const { start, end } = props.dateRange;

  const data = await DspStatApiService.getAll({
    UserId,
    StartDate: start.toISOString(),
    EndDate: end.toISOString(),
    IsDsp: props.panel === "dsp",
    IsDspInApp: props.panel === "dsp-in-app",
    IsDspBanner: props.panel === "dsp-banner",
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

const columns = computed((): EditableTableColumn<DspStatResDto>[] => [
  {
    accessorKey: "date",
    header: "date",
    type: "date",
    editable: !props.readonly,
    cell: ({ row }) => `${format(row.getValue<string>("date"), "dd.MM.yy")}`,
  },
  {
    accessorKey: "total",
    type: "number",
    editable: !props.readonly,
    cell: ({ row }) => `${n.format(row.getValue<number>("total"))}`,
  },
  {
    accessorKey: "ack",
    type: "number",
    editable: !props.readonly,
    cell: ({ row }) => `${n.format(row.getValue<number>("ack"))}`,
  },
  {
    accessorKey: "win",
    type: "number",
    editable: !props.readonly,
    cell: ({ row }) => `${n.format(row.getValue<number>("win"))}`,
  },
  {
    accessorKey: "impsCount",
    header: "imps count",
    type: "number",
    editable: !props.readonly,
    cell: ({ row }) => `${n.format(row.getValue<number>("impsCount"))}`,
  },
  {
    accessorKey: "showRate",
    header: "show rate",
    type: "percent",
    editable: !props.readonly,
    cell: ({ row }) => `${p.format(row.getValue<number>("impsCount"))}`,
  },
  {
    accessorKey: "clicksCount",
    header: "clicks count",
    type: "number",
    editable: !props.readonly,
    cell: ({ row }) => `${n.format(row.getValue<number>("clicksCount"))}`,
  },
  {
    accessorKey: "ctr",
    type: "percent",
    editable: !props.readonly,
    cell: ({ row }) => `${p.format(row.getValue<number>("ctr"))}`,
  },
  {
    accessorKey: "startsCount",
    header: "starts count",
    type: "number",
    editable: !props.readonly,
    cell: ({ row }) => `${n.format(row.getValue<number>("startsCount"))}`,
  },
  {
    accessorKey: "completesCount",
    header: "completes count",
    type: "number",
    editable: !props.readonly,
    cell: ({ row }) => `${n.format(row.getValue<number>("completesCount"))}`,
  },
  {
    accessorKey: "vtr",
    type: "percent",
    editable: !props.readonly,
    cell: ({ row }) => `${p.format(row.getValue<number>("vtr"))}`,
  },
]);

function onChange(id: number, key: keyof DspStatResDto, value: any) {
  DspStatApiService.change({ id, key, value });
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
    :mode="_mode" :columns="columns" :rows="dspStats.userStatistics" @change="onChange"
  />
</template>
