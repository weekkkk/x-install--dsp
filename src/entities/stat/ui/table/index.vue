<script setup lang="ts">
import { format } from "date-fns";
import type { TStatTableProps } from "./types";

const props = withDefaults(defineProps<TStatTableProps>(), { mode: "view" });

const addedRow: StatResDto = { id: -1 };
const multiModel = defineModel<StatResDto["id"][]>("multi");

const _rows = computed(
  () => props.stats && [...props.stats, ...(props.readonly ? [] : [addedRow])]
);

const emit = defineEmits<{
  create: [addedRow: StatResDto];
  delete: [];
  change: [id: UserResDto["id"], key: keyof StatResDto, value: string];
}>();

const onChange = (row: StatResDto, key: keyof StatResDto, value: string) => {
  if (row.id === -1) {
    row[key] = value as never;
    // emit("create", key, value);
    return;
  }
  emit("change", row.id, key, value);
};

const formatDate = (date: string) => {
  try {
    const _date = new Date(date);

    return `${format(_date, "dd.MM.yy")} ${format(_date, "HH:mm:ss")}`;
  } catch {
    return date;
  }
};
</script>
<template>
  <div
    class="p-16 bg-dark-50 rounded-t-[2rem] grow max-md:pb-40 relative overflow-auto flex flex-col"
    :class="{ 'pb-48': !readonly }"
  >
    <div class="w-fit grow">
      <UiTable
        v-memo="[_rows, loading, footer, mode, multiModel?.length]"
        :is-checkbox="mode === 'del'"
        v-model:checkbox="multiModel"
        :readonly="readonly || mode === 'del'"
        by="id"
        :columns="[
          { key: 'date' },
          { key: 'total' },
          { key: 'ack' },
          { key: 'win' },
          { key: 'impsCount', label: 'imps count' },
          { key: 'showRate', label: 'show rate' },
          { key: 'clicksCount', label: 'clicks count' },
          { key: 'ctr', label: 'ctr' },
          { key: 'startsCount', label: 'starts count' },
          { key: 'completesCount', label: 'completes count' },
          { key: 'vtr' },
        ]"
        :rows="_rows"
        :editable-cols="[
          'total',
          'ack',
          'win',
          'impsCount',
          'showRate',
          'clicksCount',
          'ctr',
          'startsCount',
          'completesCount',
          'vtr',
        ]"
        :customize-cols="['date']"
        :procent-cols="['showRate', 'ctr', 'vtr']"
        type="number"
        :loading="loading"
        :readonly-rows="footer && [footer.id]"
        @change="onChange($event.row, $event.key, $event.value)"
      >
        <template #date-data="{ row }">
          <UPopover :disabled="readonly || mode === 'del'">
            <span class="flex gap-4 w-48" v-if="row.date">
              <span v-for="part in formatDate(row.date).split(' ')">
                {{ part }}
              </span>
            </span>
            <span v-else class="text-gray-500"> date </span>
            <template #panel>
              <UiDatePicker
                :model-value="new Date(row.date)"
                @update:model-value="
                  onChange(row, 'date', $event.toISOString())
                "
              />
            </template>
          </UPopover>
        </template>
        <template #date-header>
          <span class="w-full text-left inline-block"> date </span>
        </template>
      </UiTable>

      <UiTable
        class="sticky bottom-0 top-full w-full"
        v-memo="[footer]"
        by="id"
        :custom-ui="{
          divide: 'dark:divide-[transparent]',
          th: {
            base: 'hidden',
          },
        }"
        :columns="[
          { key: 'date' },
          { key: 'total' },
          { key: 'ack' },
          { key: 'win' },
          { key: 'impsCount', label: 'imps count' },
          { key: 'showRate', label: 'show rate' },
          { key: 'clicksCount', label: 'clicks count' },
          { key: 'ctr', label: 'ctr' },
          { key: 'startsCount', label: 'starts count' },
          { key: 'completesCount', label: 'completes count' },
          { key: 'vtr' },
        ]"
        :rows="footer ? [footer] : []"
        :editable-cols="[
          'total',
          'ack',
          'win',
          'impsCount',
          'showRate',
          'clicksCount',
          'ctr',
          'startsCount',
          'completesCount',
          'vtr',
        ]"
        :customize-cols="['date']"
        :procent-cols="['showRate', 'ctr', 'vtr']"
        type="number"
        readonly
        @change="onChange($event.row, $event.key, $event.value)"
        hide-empty
      >
        <template #date-data="{ row }">
          <span class="flex gap-4 w-48" v-if="row.date"> Total </span>
        </template>
      </UiTable>
    </div>
  </div>

  <div
    v-show="!readonly"
    class="z-50 fixed bottom-0 left-1/2 -translate-x-1/2 pb-20 max-md:pb-8 max-md:pr-8 max-md:right-60 max-md:left-auto max-md:translate-x-0"
  >
    <UButton
      v-show="mode === 'view'"
      class="w-[13.4rem]"
      :ui="{
        icon: {
          size: {
            sm: 'h-[1rem] w-[1rem]',
          },
        },
      }"
      :loading="loading"
      @click="emit('create', addedRow)"
    >
      Create
    </UButton>
    <UButton
      v-show="mode === 'del'"
      class="w-[13.4rem]"
      :ui="{
        icon: {
          size: {
            sm: 'h-[1rem] w-[1rem]',
          },
        },
      }"
      :loading="loading"
      @click="emit('delete')"
    >
      Delete
    </UButton>
  </div>
</template>
