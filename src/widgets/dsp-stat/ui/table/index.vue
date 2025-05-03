<script setup lang="ts">
import type { DspStatTableWidgetProps } from "./interfaces";
import { startOfToday, startOfTomorrow } from "date-fns";

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

const columns: EditableTableColumn<DspStatResDto>[] = [
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
    accessorKey: "ack",
    type: "number",
    editable: true,
  },
  {
    accessorKey: "win",
    type: "number",
    editable: true,
  },
  {
    accessorKey: "impsCount",
    header: "imps count",
    type: "number",
    editable: true,
  },
  {
    accessorKey: "showRate",
    header: "show rate",
    type: "percent",
    editable: true,
  },
  {
    accessorKey: "clicksCount",
    header: "clicks count",
    type: "number",
    editable: true,
  },
  {
    accessorKey: "ctr",
    type: "percent",
    editable: true,
  },
  {
    accessorKey: "startsCount",
    header: "starts count",
    type: "number",
    editable: true,
  },
  {
    accessorKey: "completesCount",
    header: "completes count",
    type: "number",
    editable: true,
  },
  {
    accessorKey: "vtr",
    type: "percent",
    editable: true,
  },
];

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
