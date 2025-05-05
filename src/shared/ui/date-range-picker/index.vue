<script setup lang="ts">
import { CalendarDate, getLocalTimeZone } from "@internationalized/date";

import { endOfDay, format, toDate } from "date-fns";

const modelValue = defineModel<{ start?: string; end?: string }>({ default: () => ({}) });

function getDefaultValue(value: { start?: string; end?: string }) {
  let start = new Date();
  let end = new Date();
  end.setDate(end.getDate() + 1);
  if (value.start) {
    start = toDate(value.start);
  }
  if (value.end)
    end = toDate(value.end);

  return { start: new CalendarDate(
    start.getFullYear(),
    start.getMonth() + 1,
    start.getDate(),
  ), end: new CalendarDate(
    end.getFullYear(),
    end.getMonth() + 1,
    end.getDate(),
  ) };
}

const _modelValue = computed({
  get: () => getDefaultValue(modelValue.value),
  set: ({ start, end }) => {
    modelValue.value = {
      start: start.toDate(getLocalTimeZone()).toISOString(),
      end: endOfDay(end.toDate(getLocalTimeZone())).toISOString(),
    };
  },
});
</script>

<template>
  <UPopover :ui="{ content: 'ring-0 px-5 py-6.25 bg-neutral-900 rounded-3xl' }">
    <template #default>
      <UButton size="sm" color="neutral" class="whitespace-nowrap">
        {{ format(_modelValue.start.toString(), 'dd.MM.yyyy') }} - {{ format(_modelValue.end.toString(), 'dd.MM.yyyy') }}
      </UButton>
    </template>

    <template #content>
      <UCalendar
        v-model="_modelValue"
        class="w-98 max-md:w-75"
        :year-controls="false"
        :month-controls="false"
        weekday-format="short"
        range
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
                @click="
                  _modelValue
                    = { start: _modelValue.start.subtract({ months: 1 }),
                        end: _modelValue.end.subtract({ months: 1 }) }"
              />
              <UButton
                icon="xii:right"
                color="neutral" variant="ghost"
                size="xs"
                @click="
                  _modelValue
                    = { start: _modelValue.start.add({ months: 1 }),
                        end: _modelValue.end.add({ months: 1 }) }"
              />
            </div>
          </div>
        </template>
      </UCalendar>
    </template>
  </UPopover>
</template>
