<script setup lang="ts">
import { format } from "date-fns";
import type { TStatTableProps } from "./types";

const props = defineProps<TStatTableProps>();

const _rows = computed(() => props.stats && [...props.stats, { id: -1 }]);
</script>
<template>
  <UiTable
    v-memo="[]"
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
      'date',
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
    :loading="loading"
  >
  </UiTable>
</template>
