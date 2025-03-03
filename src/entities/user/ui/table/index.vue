<script setup lang="ts">
import type { TUserTableProps } from "./types";

const props = defineProps<TUserTableProps>();

const model = defineModel<TUser["id"] | undefined>();
const multiModel = defineModel<TUser["id"][] | undefined>("multi");

const multiModelValue = computed({
  get: () =>
    multiModel.value?.map((id) => {
      const user = props.users.find(({ id: _id }) => _id === id);
      if (!user) throw new Error();
      return user;
    }),
  set: (v) => {
    multiModel.value = v?.map(({ id }) => id);
  },
});

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
    v-model:radio="model"
    v-model:checkbox="multiModelValue"
    :is-radio="selectable"
    :is-checkbox="multiSelectable"
    by="id"
    :columns="[
      { key: 'dateAdd', label: 'date add' },
      { key: 'id' },
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
