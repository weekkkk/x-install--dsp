<script setup lang="ts">
import { DatePicker as VCalendarDatePicker } from "v-calendar";
import type {
  DatePickerDate,
  DatePickerRangeObject,
} from "v-calendar/dist/types/src/use/datePicker.js";
import "v-calendar/dist/style.css";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  modelValue: {
    type: [Date, Object] as PropType<
      DatePickerDate | DatePickerRangeObject | null
    >,
    default: null,
  },
});

const emit = defineEmits(["update:model-value", "close"]);

const date = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:model-value", value);
    emit("close");
  },
});

const attrs = {
  transparent: true,
  borderless: true,
  color: "primary",
  "is-dark": { selector: "html", darkClass: "dark" },
  "first-day-of-week": 2,
};

function onDayClick(_: any, event: MouseEvent): void {
  const target = event.target as HTMLElement;
  target.blur();
}
</script>

<template>
  <VCalendarDatePicker
    v-if="date && (date as DatePickerRangeObject)?.start && (date as DatePickerRangeObject)?.end"
    v-model.range="date"
    v-bind="{ ...attrs, ...$attrs }"
    title-position="left"
    :locale="{
      id: 'en',
      firstDayOfWeek: 2,
      masks: { weekdays: 'WWW', title: 'MMM YYYY' },
    }"
    @dayclick="onDayClick"
  />
  <VCalendarDatePicker
    v-else
    v-model="date"
    title-position="left"
    v-bind="{ ...attrs, ...$attrs }"
    :locale="{
      id: 'en',
      firstDayOfWeek: 2,
      masks: { weekdays: 'WWW', title: 'MMM YYYY' },
    }"
    @dayclick="onDayClick"
  />
</template>

<style>
:root {
  --vc-text-sm: 1.5rem;
  --vc-text-lg: 2.5rem;
}
.vc-dark {
  --vc-popover-content-bg: #0a0a0a;
  --vc-popover-content-border: #1d1d1d;
  --vc-focus-ring: 0 0 0 2px #6ae15f;
}

.vc-primary {
  --vc-accent-300: rgba(0, 0, 0, 0.75);
  --vc-accent-800: #101010;
}

.vc-header {
  @apply gap-10 h-12 px-10 mt-10;
}
.vc-header .vc-title {
  @apply leading-[3rem] p-0;
}
.vc-header .vc-arrow {
  @apply !h-[2.4rem] !w-[2.4rem];
}
.vc-header .vc-arrow svg {
  @apply !h-[2.4rem] !w-[2.4rem];
}

.vc-highlight-bg-solid,
.vc-highlight-bg-outline,
.vc-nav-item.is-active {
  @apply bg-gradient-to-r from-brand-from to-brand-to;
}
.vc-day:has(+ .vc-day:last-child) .vc-day-content:not(:hover),
.vc-day:last-child .vc-day-content:not(:hover) {
  @apply text-[#313131];
}
.vc-day-layer:has(.vc-highlight-bg-solid, .vc-highlight-bg-outline)
  + .vc-day-content {
  /* ---vc-highlight-solid-content-color: #000; */
  @apply !text-black;
}

.is-not-in-month * {
  @apply !opacity-100 !pointer-events-auto;
}
.vc-pane-container {
  @apply w-fit;
}
.vc-pane {
  @apply min-w-[43.2rem] max-md:min-w-[37.5rem];
}
.vc-weeks {
  @apply min-w-[43.2rem] max-md:min-w-[37.5rem] px-5 mx-auto pt-8 pb-[1.25rem];
}
.vc-weekday {
  @apply leading-[1.8rem] pb-[1.25rem] pt-0 font-medium;
}
.vc-day-content {
  @apply !font-semibold;
}

.vc-day {
  @apply min-h-[4.3rem];
}
.vc-highlight,
.vc-day-content {
  @apply h-14 w-14;
}

.vc-day:first-child .vc-highlight-bg-light {
  @apply !rounded-l-full;
}
.vc-day:last-child .vc-highlight-bg-light {
  @apply !rounded-r-full;
}
</style>
