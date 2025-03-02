<script setup lang="ts">
const auntificated = ref(true);
const isAdmin = ref(true);
const nickname = ref("1WIN Casino");
const id = ref("1661R");
const name = ref("A");

import { sub, format, isSameDay, type Duration } from "date-fns";

const ranges = [
  { label: "Last 7 days", duration: { days: 7 } },
  { label: "Last 14 days", duration: { days: 14 } },
  { label: "Last 30 days", duration: { days: 30 } },
  { label: "Last 3 months", duration: { months: 3 } },
  { label: "Last 6 months", duration: { months: 6 } },
  { label: "Last year", duration: { years: 1 } },
];
const selected = ref({ start: sub(new Date(), { days: 14 }), end: new Date() });

function isRangeSelected(duration: Duration) {
  return (
    isSameDay(selected.value.start, sub(new Date(), duration)) &&
    isSameDay(selected.value.end, new Date())
  );
}

function selectRange(duration: Duration) {
  selected.value = { start: sub(new Date(), duration), end: new Date() };
}

const options = [
  { id: 1, name: "By Day" },
  { id: 2, name: "By Week" },
  { id: 3, name: "By Month" },
];
const _selected = ref(options[1]);
const _options = computed(() =>
  options.filter(({ id }) => id !== _selected.value.id)
);
</script>

<template>
  <UToggle v-model="auntificated" class="fixed bottom-0 left-0" size="xl" />
  <UToggle v-model="isAdmin" class="fixed bottom-0 right-0" size="xl" />

  <div class="h-screen flex flex-col">
    <header class="px-20 py-14 flex justify-between items-center">
      <div class="w-full flex items-center gap-[11.1rem]">
        <UIcon name="xi-i:logo" class="h-12 w-[4.2rem]" />

        <!-- <div v-if="auntificated" class="flex gap-3">
          <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton color="gray" class="w-[13.4rem]">
              {{ format(selected.start, "dd.MM.yy") }} -
              {{ format(selected.start, "dd.MM.yy") }}
            </UButton>

            <template #panel="{ close }">
              <UiDatePicker v-model="selected" @close="close" />
            </template>
          </UPopover>

          <USelectMenu
            v-model="_selected"
            :options="_options"
            :popper="{ offsetDistance: 0 }"
            variant="none"
            :ui="{
              padding: {
                sm: 'p-0',
              },
              icon: {
                base: 'hidden',
                size: {
                  sm: 'h-0 w-0',
                },
                trailing: {
                  padding: {
                    sm: 'p-0',
                  },
                },
              },
              trailing: {
                padding: {
                  sm: 'pe-0',
                },
              },
            }"
            :ui-menu="{
              padding: 'p-0',
              background: 'dark:bg-[transparent]',
              ring: 'ring-0',
              option: {
                base: 'mt-2',
                padding: 'p-0',
                rounded: 'rounded-full',
              },
            }"
          >
            <template #label>
              <UButton color="gray" class="w-32">
                {{ _selected.name }}
              </UButton>
            </template>
            <template #option="{ option: filter }">
              <UButton color="gray" class="w-32">
                {{ filter.name }}
              </UButton>
            </template>
          </USelectMenu>
        </div> -->

        <div v-if="auntificated" class="flex gap-3">
          <StatDateRangeFilterWidget />
        </div>
      </div>

      <div class="flex gap-8">
        <StatTypeFilterWidget />
      </div>

      <div v-if="!auntificated">
        <UButton class="w-[13.5rem] text-2xl h-24" color="gray">
          Log in
        </UButton>
      </div>

      <div v-else class="flex justify-end gap-8 w-full">
        <UButton v-if="isAdmin" icon="xi-i:category" color="gray" />
        <UButton v-if="isAdmin" color="gray" class="w-[13.4rem]">
          {{ nickname }}
        </UButton>
        <UButton color="gray" class="w-32"> Id: {{ id }} </UButton>

        <UPopover
          :ui="{
            background: 'dark:bg-transparent',
            ring: 'ring-0',
            rounded: 'rounded-full',
          }"
        >
          <UAvatar :alt="name" />

          <template #panel="{ close }">
            <UButton icon="xi-i:logout" color="gray" @click="close" />
          </template>
        </UPopover>
      </div>
    </header>

    <main class="px-4">
      <NuxtPage />
    </main>
  </div>
</template>
