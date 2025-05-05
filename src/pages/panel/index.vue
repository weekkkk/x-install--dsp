<script setup lang="ts">
import { toDate } from "date-fns";

const route = useRoute();

const user = useAuthApiUser();

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
  <div class="flex flex-col justify-between grow shrink gap-10">
    <article>
      <InstallStatIndicatorsWidget
        v-if="panel === 'install'"
        v-model="ids" :mode="mode" :user-id="userId ?? user?.id"
        :date-range="dateRange"
      />
      <DspStatIndicatorsWidget
        v-else
        v-model="ids"
        :panel="panel" :mode="mode" :user-id="userId ?? user?.id"
        :date-range="dateRange"
      />
    </article>
    <article
      class="shirk grow max-h-2/3 bg-neutral-900 rounded-t-2xl p-10 max-md:px-0 max-md:pt-5 flex flex-col"
      :class="{ 'pb-30.5 max-md:pb-23.5': mode === 'create' || mode === 'delete' }"
    >
      <InstallStatTableWidget
        v-if="panel === 'install'"
        v-model="ids"
        class="-my-3"
        :mode="mode" :user-id="userId ?? user?.id"
        :date-range="dateRange"
        :readonly="userId === undefined"
      />
      <DspStatTableWidget
        v-else
        v-model="ids" :mode="mode" :user-id="userId ?? user?.id"
        class="-my-3"
        :date-range="dateRange"
        :panel="panel"
        :readonly="userId === undefined"
      />
    </article>
  </div>
</template>
