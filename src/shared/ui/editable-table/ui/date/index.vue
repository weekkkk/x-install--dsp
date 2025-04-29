<script setup lang="ts">
import { CalendarDate, DateFormatter, getLocalTimeZone } from "@internationalized/date";

const df = new DateFormatter("en-US", {
  dateStyle: "medium",
});

const modelValue = defineModel<string>();

const _modelValue = computed({
  get: () => {
    if (!modelValue.value)
      return;
    const date = new Date(modelValue.value);
    return new CalendarDate(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
  },
  set: (v) => {
    modelValue.value = v?.toDate(getLocalTimeZone()).toISOString();
  },
});
</script>

<template>
  {{ modelValue }}
  <UPopover>
    <UButton>
      {{ _modelValue ? df.format(_modelValue.toDate(getLocalTimeZone())) : 'Select a date' }}
    </UButton>

    <template #content>
      <UCalendar v-model="_modelValue" class="p-2" />
    </template>
  </UPopover>
</template>
