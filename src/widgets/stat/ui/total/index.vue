<script setup lang="ts">
const auth = useState<boolean>("auth");

const route = useRoute();

const { data, status, refresh } = await useAsyncData(
  "stats",
  async () =>
    auth.value && route.query.start && route.query.end && route.query.panel
      ? await StatApiService.getAll({
          UserId: Number(route.query.user),
          IsDsp: route.query.panel === "dsp",
          IsDspInApp: route.query.panel === "dsp--in-app",
          IsDspBanner: route.query.panel === "dsp--banner",
          StartDate: route.query.start.toString(),
          EndDate: route.query.end.toString(),
        })
      : null,
  {
    watch: [
      auth,
      () => route.query.user,
      () => route.query.start,
      () => route.query.end,
      () => route.query.panel,
    ],
    immediate: true,
  }
);

const total = computed(() => {
  if (!data.value) return;
  const { ctr, showRate } = data.value.averages;
  const {
    ack,
    clicksCount,
    completesCount,
    impsCount,
    startsCount,
    total,
    win,
  } = data.value.total;
  return {
    ack,
    clicksCount,
    completesCount,
    impsCount,
    startsCount,
    total,
    win,
    ctr,
    showRate,
    showns: data.value.totalAllTime,
  };
});
</script>

<template>
  <div
    class="flex flex-col items-center gap-[9.8rem] pb-[4.8rem] pt-[9.5rem] px-[4.8rem] max-md:px-[2rem] max-md:pb-20 max-md:pt-16"
  >
    <StatTotalItem label="showns" :value="total?.showns" large />

    <div class="flex w-full max-md:flex-wrap max-md:gap-4">
      <StatTotalItem label="total" :value="total?.total" />
      <StatTotalItem label="ack" :value="total?.ack" />
      <StatTotalItem label="imps count" :value="total?.impsCount" />
      <StatTotalItem label="show rate" :value="total?.showRate" procent />
      <StatTotalItem label="clicks count" :value="total?.clicksCount" />
      <StatTotalItem label="ctr" :value="total?.ctr" procent />
    </div>
  </div>
</template>
