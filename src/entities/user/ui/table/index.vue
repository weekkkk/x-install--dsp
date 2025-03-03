<script setup lang="ts">
import type { TUserTableProps } from "./types";

const props = defineProps<TUserTableProps>();

const model = defineModel<TUser["id"]>();

const onChange = (row: TUser, key: keyof TUser, value: string) => {
  console.log({ row, key, value });
};

const onChangePanels = (
  row: TUser,
  key: keyof TUser["panels"],
  value: boolean
) => {
  console.log({ row, key, value });
};
</script>

<template>
  <UiTable
    v-model="model"
    radio
    by="id"
    :columns="[
      { key: 'id' },
      { key: 'dateAdd', label: 'date add' },
      { key: 'nickname' },
      { key: 'panels', label: 'unlocked' },
    ]"
    :rows="users"
    :editable-cols="['nickname']"
    :customize-cols="['panels']"
    @change="onChange($event.row, $event.key, $event.value)"
  >
    <template #panels-data="{ row }">
      <div class="flex gap-16">
        <UCheckbox
          :model-value="row.panels['dsp']"
          @change="onChangePanels(row, 'dsp', $event)"
          label="DSP"
        />
        <UCheckbox
          :model-value="row.panels['dsp--in-app']"
          @change="onChangePanels(row, 'dsp--in-app', $event)"
          label="DSP InApp"
        />
        <UCheckbox
          :model-value="row.panels['dsp--banner']"
          @change="onChangePanels(row, 'dsp--banner', $event)"
          label="DSP Banner"
        />
      </div>
    </template>
  </UiTable>
</template>
