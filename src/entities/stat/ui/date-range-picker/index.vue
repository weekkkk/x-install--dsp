<script setup lang="ts">
import { format } from "date-fns";
import { rangesConst } from "./consts";

const emit = defineEmits<{
  change: [
    dates:
      | {
          start: Date;
          end: Date;
        }
      | undefined
  ];
}>();

const range = ref<(typeof rangesConst)[number] | undefined>(rangesConst[0]);

const dateRange = computed({
  get: () => {
    if (!range.value) return;
    if ("getDates" in range.value) return range.value.getDates();
    return range.value.dates;
  },
  set: (dates) => {
    const customRange = rangesConst.at(-1);
    if (!customRange) return;
    const { key, label } = customRange;
    if (key !== "custom") return;
    range.value = { key, label, dates };
  },
});

watch(dateRange, (dates) => emit("change", dates));
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start', overflowPadding: 0 }">
    <UButton color="gray" class="w-[13.4rem]">
      <span v-if="dateRange">
        {{ format(dateRange.start, "dd.MM.yy") }} -
        {{ format(dateRange.end, "dd.MM.yy") }}
      </span>
      <span v-else> Select range </span>
    </UButton>

    <template #panel="{ close }">
      <UiDatePicker v-model="dateRange" @close="close" />
    </template>
  </UPopover>

  <UiButtonSelect :options="rangesConst" v-model="range" />
</template>
