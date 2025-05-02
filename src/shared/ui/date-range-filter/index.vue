<script setup lang="ts">
import { addDays, endOfMonth, endOfWeek, format, startOfDay, startOfMonth, startOfToday, startOfTomorrow, startOfWeek, toDate } from "date-fns";

const route = useRoute();

function formatDate<T extends Date>(date: T) {
  return date.toISOString();
}

const options = computed(() => {
  const date = new Date();
  return [
    {
      label: "By Day",
      value: `${formatDate(startOfToday())} - ${formatDate(startOfTomorrow())}`,
    },
    {
      label: "By Week",
      value: `${formatDate(startOfWeek(date))} - ${formatDate(startOfDay(endOfWeek(date)))}`,
    },
    {
      label: "By Month",
      value: `${formatDate(startOfMonth(date))} - ${formatDate(startOfDay(endOfMonth(date)))}`,
    },
  ];
});

const rangeStr = computed(() => route.query.dateRange?.toString() ?? options.value[0].value);

const range = computed({
  get: () => {
    const [start, end] = rangeStr.value.split(" - ");
    return {
      start: toDate(start).toISOString(),
      end: toDate(end).toISOString(),
    };
  },
  set: ({ start, end }) => {
    navigateTo({ query: { dateRange: `${formatDate(toDate(start))} - ${formatDate(toDate(end))}` } });
  },
});
function onUpdateRangeStr(dateRange?: string) {
  navigateTo({ query: { dateRange } });
}
</script>

<template>
  <div class="flex gap-5 max-md:gap-2.5">
    <UiDateRangePicker v-model="range" />
    <UiButtonSelect
      :options="options"
      :model-value="rangeStr" @update:model-value="onUpdateRangeStr"
    />
  </div>
</template>
