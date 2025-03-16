<script setup lang="ts">
import { format } from "date-fns";
import { rangesConst } from "./consts";

const range = defineModel<
  Pick<(typeof rangesConst)[number], "key"> & {
    dates: { start: Date; end: Date };
  }
>();

const rangeConst = computed({
  get: () => {
    const r = range.value;
    if (!r) return rangesConst[0];
    return rangesConst.find(({ key }) => key === r.key) || rangesConst[0];
  },
  set: (v) => {
    if (!("getDates" in v)) return;
    range.value = { key: v.key, dates: v.getDates() };
  },
});

const dates = computed({
  get: () => {
    const v = range.value;
    if (!v) return;

    if (v.key === "custom") return v.dates;
    const r = rangesConst.find(({ key }) => key === v.key);
    if (!r) return;
    if ("getDates" in r) return r.getDates();
    return r.dates;
  },
  set: (dates) => {
    const customRange = rangesConst.at(-1);
    if (!customRange) return;
    const { key } = customRange;
    if (key !== "custom" || !dates) return;
    range.value = { key, dates };
  },
});
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start', overflowPadding: 0 }">
    <UButton color="gray" class="w-64">
      <span v-if="dates">
        {{ format(dates.start, "dd.MM.yy") }} -
        {{ format(dates.end, "dd.MM.yy") }}
      </span>
      <span v-else> Select range </span>
    </UButton>

    <template #panel="{ close }">
      <UiDatePicker v-model="dates" @close="close" />
    </template>
  </UPopover>

  <UiButtonSelect :options="rangesConst" v-model="rangeConst" />
</template>
