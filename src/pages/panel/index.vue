<script setup lang="ts">
import { toDate } from "date-fns";

const route = useRoute();

const userId = computed(() => {
  const id = route.params.userId;
  if (!id)
    return;
  return Number(id);
});
const mode = computed(() => {
  return route.params.mode as "create" | "view" | "delete" | undefined;
});

const dateRange = computed(() => {
  const range = route.query.dateRange as string | undefined;
  if (!range)
    return;
  const [start, end] = range.split(" - ");
  return { start: toDate(start), end: toDate(end) };
});

const ids = computed({
  get: () => {
    return route.query.ids ? JSON.parse(`${route.query.ids}`) as number[] : [];
  },
  set: (v) => {
    navigateTo({ query: { ids: JSON.stringify(v) } });
  },
});

const panel = computed(() => route.params.panel as UserPanel);
</script>

<template>
  <article class="bg-neutral-900 rounded-t-2xl p-10 pb-27.5 h-full max-md:px-0 max-md:pt-5 max-md:pb-17.5">
    <InstallStatTableWidget
      v-if="panel === 'install'"
      v-model="ids" :mode="mode" :user-id="userId"
      :date-range="dateRange"
    />
    <DspStatTableWidget
      v-else
      v-model="ids" :mode="mode" :user-id="userId"
      :date-range="dateRange"
      :panel="panel"
    />
  </article>
</template>
