<script setup lang="ts">
import type { InstallStatIndicatorsWidgetProps } from "./interfaces";
import { startOfToday, startOfTomorrow } from "date-fns";

const props = withDefaults(defineProps<InstallStatIndicatorsWidgetProps>(), {
  dateRange: () => {
    return { start: startOfToday(), end: startOfTomorrow() };
  },
});

const user = useAuthApiUser();

const { data: installStats } = useAsyncData("install-stat-list", async () => {
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
</script>

<template>
  <UserMainIndicator label="total" :value="installStats.totalAllTime" />
</template>
