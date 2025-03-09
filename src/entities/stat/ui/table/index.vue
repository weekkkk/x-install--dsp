<script setup lang="ts">
import { format } from "date-fns";
import type { TStatTableProps } from "./types";

const props = defineProps<TStatTableProps>();

const _rows = computed(
  () =>
    props.stats && [
      ...props.stats,
      { id: -1 },
      ...(props.footer ? [props.footer] : []),
    ]
);

const emit = defineEmits<{
  create: [key: keyof StatResDto, value: string];
  change: [id: UserResDto["id"], key: keyof StatResDto, value: string];
}>();

const onChange = (row: StatResDto, key: keyof StatResDto, value: string) => {
  if (row.id === -1) {
    emit("create", key, value);
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
  <UiTable
    v-memo="[_rows, loading, footer]"
    :readonly="readonly"
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
    type="number"
    :loading="loading"
    :readonly-rows="footer && [footer.id]"
    @change="onChange($event.row, $event.key, $event.value)"
  >
    <template #date-data="{ row }">
      <span class="flex gap-4" v-if="row.date">
        <span v-for="part in formatDate(row.date).split(' ')">
          {{ part }}
        </span>
      </span>
    </template>
  </UiTable>
</template>
