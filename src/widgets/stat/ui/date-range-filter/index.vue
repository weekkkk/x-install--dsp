<script setup lang="ts">
import { rangesConst } from "~/src/entities/stat/ui/date-range-picker/consts";

const user = useState<AuthResDto['user'] | undefined>()

const route = useRoute();

onMounted(() => {
  if(!user.value) return
  if(user.value.role === 'Admin' && !route.query.user) return
  if (range.value) return;
  const r = rangesConst[0];
  if (!("getDates" in r)) return;
  const dates = r.getDates();
  navigateTo({
    path: "/",
    query: {
      key: r.key,
      start: dates.start.toISOString(),
      end: dates.end.toISOString(),
      panel: "dsp",
    },
  });
});

const range = computed({
  get: () => {
    const key = route.query.key?.toString();
    console.log(key);

    const start = route.query.start?.toString() || undefined;
    const end = route.query.end?.toString() || undefined;
    if (!key || !start || !end) return;

    return {
      key,
      dates: {
        start: new Date(start),
        end: new Date(end),
      },
    };
  },
  set: (v) => {
    navigateTo({
      query: {
        ...route.query,
        key: v?.key,
        start: v?.dates?.start.toISOString(),
        end: v?.dates?.end.toISOString(),
      },
    });
  },
});
</script>

<template>
  <StatDateRangePicker v-model="range" />
</template>
