<script setup lang="ts">
const auth = useState<boolean>("auth");

const route = useRoute();

const user = useState<AuthResDto["user"] | undefined>("user");

const { data, status, refresh } = await useAsyncData(
  "stats",
  async () =>
    auth.value &&
    route.query.start &&
    route.query.end &&
    route.query.panel &&
    user.value
      ? await StatApiService.getAll({
          UserId:
            user.value.role === "Admin"
              ? Number(route.query.user)
              : user.value.id,
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
      user,
      () => route.query.user,
      () => route.query.start,
      () => route.query.end,
      () => route.query.panel,
    ],
    immediate: true,
  }
);

const stats = computed(() => {
  if (!data.value) return;
  return data.value.userStatistics.toSorted(({ id: a }, { id: b }) => a - b);
});

const footer = computed(() => {
  if (!data.value) return;
  const stat: StatResDto = { id: -2, date: "Total", ...data.value.total };
  return stat;
});

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

const onChange = async (id: number, key: keyof StatResDto, value: string) => {
  if (!data.value || key === "date") return;
  const stat = data.value.userStatistics.find(({ id: _id }) => _id === id);
  if (!stat) return;
  stat[key] = Number(value.replaceAll(" ", ""));

  await StatApiService.change({
    id,
    key,
    value: Number(value.replaceAll(" ", "")),
  });
  await refresh();
};
</script>

<template>
  <StatTable
    v-if="stats"
    :loading="status === 'pending'"
    :stats="stats"
    :footer="footer"
    @create="createStat"
    @change="onChange"
    :readonly="user?.role !== 'Admin'"
  />
</template>
