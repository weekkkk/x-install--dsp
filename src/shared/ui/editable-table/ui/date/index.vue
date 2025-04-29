<script setup lang="ts">
import { CalendarDate, DateFormatter, getLocalTimeZone } from "@internationalized/date";
import { format } from "date-fns";

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
  <UPopover>
    <template #default="{ open }">
      <div class="h">
        {{ modelValue ? format(modelValue, 'dd.MM.yyyy') : 'Select a date' }}
      </div>
    </template>

    <template #content>
      <UCalendar v-model="_modelValue" class="p-2" />
    </template>
  </UPopover>
</template>
