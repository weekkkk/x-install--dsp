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
  }
);

onMounted(() => {
  refresh();
});

const stats = computed(() => {
  if (!data.value) return;
  return data.value.userStatistics.toSorted(
    ({ date: a }, { date: b }) =>
      ((b && new Date(b).getTime()) || 0) - ((a && new Date(a).getTime()) || 0)
  );
});

const footer = computed(() => {
  if (!data.value) return;
  const stat: StatResDto = {
    id: -2,
    date: "Total",
    ...data.value.total,
    showRate: undefined,
    ctr: undefined,
    vtr: undefined,
  };
  return stat;
});

const createStat = async (stat: StatResDto) => {
  const userId = route.query.user;
  if (!userId) return;
  const _stat = Object.entries(stat).reduce(
    (calc, [key, value]) =>
      key === "date"
        ? { ...calc, [key]: value }
        : {
            ...calc,
            [key]:
              (value && Number(value.toString().replaceAll(" ", ""))) ||
              undefined,
          },
    {} as any
  );
  await StatApiService.create({
    ..._stat,
    date: _stat.date || new Date().toISOString(),
    userId: Number(userId),
    IsDsp: route.query.panel === "dsp",
    IsDspInApp: route.query.panel === "dsp--in-app",
    IsDspBanner: route.query.panel === "dsp--banner",
  });
  Object.assign(stat, {
    date: undefined,
    total: undefined,
    ack: undefined,
    win: undefined,
    impsCount: undefined,
    showRate: undefined,
    clicksCount: undefined,
    ctr: undefined,
    startsCount: undefined,
    completesCount: undefined,
    vtr: undefined,
  });
  await refresh();
};

const onChange = async (id: number, key: keyof StatResDto, value: string) => {
  if (!data.value) return;
  const stat = data.value.userStatistics.find(({ id: _id }) => _id === id);
  if (!stat) return;
  if (key !== "date") {
    stat[key] = Number(value.replaceAll(" ", ""));

    await StatApiService.change({
      id,
      key,
      value: value.replaceAll(" ", ""),
    });
  } else {
    stat[key] = value;
    await StatApiService.change({
      id,
      key,
      value,
    });
  }
  await refresh();
};

const statForDeleteIds = ref<StatResDto["id"][]>([]);

watch(
  () => route.query.mode,
  () => (statForDeleteIds.value = [])
);

const onDelete = async () => {
  if (!statForDeleteIds.value.length) return;
  await StatApiService.deleteByIds(statForDeleteIds.value);
  await refresh();
  statForDeleteIds.value = [];
};
</script>

<template>
  <StatTable
    v-if="stats"
    :mode="route.query.mode as 'del' | 'view'"
    v-model:multi="statForDeleteIds"
    :loading="status === 'pending'"
    :stats="stats"
    :footer="footer"
    @create="createStat"
    @delete="onDelete"
    @change="onChange"
    :readonly="user?.role !== 'Admin'"
  />
</template>
