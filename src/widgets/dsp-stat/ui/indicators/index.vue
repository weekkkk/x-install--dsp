<script setup lang="ts">
import type { DspStatIndicatorsWidgetProps } from "./interfaces";
import { startOfToday, startOfTomorrow } from "date-fns";

const props = withDefaults(defineProps<DspStatIndicatorsWidgetProps>(), {
  dateRange: () => {
    return { start: startOfToday(), end: startOfTomorrow() };
  },
});

const user = useAuthApiUser();

const { data: dspStats } = useAsyncData(`${props.panel}-stat-list`, async () => {
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
  default: () => ({ userStatistics: [], total: {}, totalAllTime: 0, averages: {} } as Awaited<ReturnType<typeof DspStatApiService.getAll>>),
  watch: [() => props.dateRange],
  dedupe: "defer",
});
</script>

<template>
  <div class="flex flex-col gap-24.5 max-md:gap-10">
    <UserMainIndicator label="total" :value="dspStats.totalAllTime" />
    <div class="grid grid-cols-6 max-md:grid-cols-2 gap-2.5 max-md:px-5">
      <UserIndicator label="total" :value="dspStats.total.total" />
      <UserIndicator label="ack" :value="dspStats.total.ack" />
      <UserIndicator label="imps count" :value="dspStats.total.impsCount" />
      <UserIndicator label="show rate" :value="dspStats.averages.showRate" percent />
      <UserIndicator label="clicks count" :value="dspStats.total.clicksCount" />
      <UserIndicator label="ctr" :value="dspStats.averages.ctr" percent />
    </div>
  </div>
</template>
