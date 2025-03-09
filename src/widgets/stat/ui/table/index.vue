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
      : { userStatistics: [] },
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

const createStat = async (key: keyof StatResDto, value: string) => {
  const userId = route.query.user;
  if (!userId) return;
  await StatApiService.create({
    userId: Number(userId),
    IsDsp: route.query.panel === "dsp",
    IsDspInApp: route.query.panel === "dsp--in-app",
    IsDspBanner: route.query.panel === "dsp--banner",
    [key]: key === "date" ? value : Number(value),
  });
  await refresh();
};

const onChange = async (id: number, key: keyof StatResDto, value: number) => {
  if (!data.value || key === "date") return;
  const stat = data.value.userStatistics.find(({ id: _id }) => _id === id);
  if (!stat) return;
  stat[key] = value;

  await StatApiService.change({
    id,
    key,
    value,
  });
};
</script>

<template>
  <StatTable
    v-if="data"
    :loading="status === 'pending'"
    :stats="data.userStatistics"
    @create="createStat"
    @change="onChange"
  />
</template>
