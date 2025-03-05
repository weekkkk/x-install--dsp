<script setup lang="ts">
import { format } from "date-fns";
import type { TUserTableProps } from "./types";

const props = defineProps<TUserTableProps>();

const model = defineModel<UserResDto["id"]>();
const multiModel = defineModel<UserResDto["id"][]>("multi");

const emit = defineEmits<{
  "change-name": [id: UserResDto["id"], name: string];
  "change-flags": [
    id: UserResDto["id"],
    flags: Pick<UserResDto, "flag1" | "flag2" | "flag3">
  ];
}>();

const onChange = (row: UserResDto, key: keyof UserResDto, value: string) => {
  if (key === "username") emit("change-name", row.id, value);
};

const rowFlags = ref<{
  [id: number]: Pick<UserResDto, "flag1" | "flag2" | "flag3">;
}>();

watch(
  () => props.users,
  (v) => {
    if (!v) {
      rowFlags.value = {};
      return;
    }
    rowFlags.value = v.reduce(
      (obj, { id, flag1, flag2, flag3 }) => ({
        ...obj,
        [id]: { flag1, flag2, flag3 },
      }),
      {}
    );
  }
);

const onChangePanels = (
  row: UserResDto,
  key: keyof Pick<UserResDto, "flag1" | "flag2" | "flag3">,
  value: boolean
) => {
  if (!rowFlags.value) return;
  rowFlags.value[row.id][key] = value;
  const { flag1, flag2, flag3 } = rowFlags.value[row.id];

  emit("change-flags", row.id, { flag1, flag2, flag3 });
};

const formatCreatedAt = (createdAt: string) => {
  const date = new Date(createdAt);

  return `${format(date, "dd.MM.yy")} ${format(date, "HH:mm:ss")}`;
};
</script>

<template>
  <UiTable
    v-memo="[users, multiModel?.length, loading]"
    v-model:radio="model"
    v-model:checkbox="multiModel"
    :is-radio="selectable"
    :is-checkbox="multiSelectable"
    :readonly="readonly"
    by="id"
    :columns="[
      { key: 'createdAt', label: 'date add' },
      { key: 'id' },
      { key: 'username' },
      { key: 'panels', label: 'unlocked' },
    ]"
    :rows="users"
    :editable-cols="['username']"
    :customize-cols="['panels', 'createdAt']"
    @change="onChange($event.row, $event.key, $event.value)"
    :loading="loading"
  >
    <template #createdAt-data="{ row }">
      <span class="flex gap-4">
        <span v-for="part in formatCreatedAt(row.createdAt).split(' ')">
          {{ part }}
        </span>
      </span>
    </template>

    <template #panels-data="{ row }">
      <div class="flex gap-16">
        <UCheckbox
          :model-value="row.flag1"
          @change="onChangePanels(row, 'flag1', $event)"
          label="DSP"
          :disabled="readonly"
        />
        <UCheckbox
          :model-value="row.flag2"
          @change="onChangePanels(row, 'flag2', $event)"
          label="DSP InApp"
          :disabled="readonly"
        />
        <UCheckbox
          :model-value="row.flag3"
          @change="onChangePanels(row, 'flag3', $event)"
          label="DSP Banner"
          :disabled="readonly"
        />
      </div>
    </template>
  </UiTable>
</template>
