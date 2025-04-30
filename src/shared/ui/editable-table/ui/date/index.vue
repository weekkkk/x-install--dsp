<script setup lang="ts">
import { CalendarDate, getLocalTimeZone } from "@internationalized/date";
import { format, isEqual, startOfDay } from "date-fns";

const modelValue = defineModel<string>();

function getDefaultValue(value?: string) {
  let date = new Date();
  if (value)
    date = new Date(value);
  return new CalendarDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  );
}

const _modelValue = shallowRef(getDefaultValue(modelValue.value));

function onOpen(value: boolean) {
  if (value)
    return;
  modelValue.value = _modelValue.value.toString();
}
</script>

<template>
  <UPopover :ui="{ content: 'ring-0 px-5 py-6.25 bg-neutral-900 rounded-3xl' }" @update:open="onOpen">
    <template #default="{ open }">
      <div
        class="absolute inset-0 p-3 hover:bg-neutral-800 cursor-text" :class="{
          'bg-neutral-800': open,
          'text-white/50': !modelValue || !isEqual(_modelValue.toDate(getLocalTimeZone()), startOfDay(modelValue)),
        }"
      >
        {{ (modelValue && isEqual(_modelValue.toDate(getLocalTimeZone()), startOfDay(modelValue))) || open ? format(_modelValue.toString(), 'dd.MM.yyyy') : 'Select a date' }}
      </div>
    </template>

    <template #content>
      <UCalendar
        v-model="_modelValue"
        class="w-98"
        :year-controls="false"
        :month-controls="false"
        weekday-format="short"
      >
        <template #heading="{ value }">
          <div class="flex justify-between gap-5.5 w-full">
            <div class="grow text-left">
              {{ format(value, 'MMM yyyy') }}
            </div>

            <div class="inline-flex gap-5.75 shrink-0">
              <UButton
                icon="xii:left"
                color="neutral" variant="ghost"
                size="xs"
                @click="_modelValue = _modelValue.subtract({ months: 1 })"
              />
              <UButton
                icon="xii:right"
                color="neutral" variant="ghost"
                size="xs"
                @click="_modelValue = _modelValue.add({ months: 1 })"
              />
            </div>
          </div>
        </template>
      </UCalendar>
    </template>
  </UPopover>
</template>
