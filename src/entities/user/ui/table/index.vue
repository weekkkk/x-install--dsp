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
    flags: Pick<UserResDto, "isDsp" | "isDspInApp" | "isDspBanner">
  ];
}>();

const onChange = (row: UserResDto, key: keyof UserResDto, value: string) => {
  if (key === "username") emit("change-name", row.id, value);
};

const rowFlags = ref<{
  [id: number]: Pick<UserResDto, "isDsp" | "isDspInApp" | "isDspBanner">;
}>();

watch(
  () => props.users,
  (v) => {
    if (!v) {
      rowFlags.value = {};
      return;
    }
    rowFlags.value = v.reduce(
      (obj, { id, isDsp, isDspInApp, isDspBanner }) => ({
        ...obj,
        [id]: { isDsp, isDspInApp, isDspBanner },
      }),
      {}
    );
  },
  {
    immediate: true,
  }
);

const onChangePanels = (
  row: UserResDto,
  key: keyof Pick<UserResDto, "isDsp" | "isDspInApp" | "isDspBanner">,
  value: boolean
) => {
  if (!rowFlags.value) return;
  rowFlags.value[row.id][key] = value;
  const { isDsp, isDspInApp, isDspBanner } = rowFlags.value[row.id];

  emit("change-flags", row.id, { isDsp, isDspInApp, isDspBanner });
};

const formatCreatedAt = (createdAt: string) => {
  const date = new Date(createdAt);

  return `${format(date, "dd.MM.yy")} ${format(date, "HH:mm:ss")}`;
};
</script>

<template>
  <div
    class="p-16 pb-48 bg-dark-50 rounded-t-[2rem] grow max-md:pb-40 relative overflow-auto flex flex-col"
  >
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
      <template #createdAt-header>
        <span class="text-left w-full inline-block"> date add </span>
      </template>

      <template #panels-data="{ row }">
        <div class="flex gap-16 justify-end">
          <UCheckbox
            :model-value="row.isDsp"
            @change="onChangePanels(row, 'isDsp', $event)"
            label="DSP"
            :disabled="readonly"
          />
          <UCheckbox
            :model-value="row.isDspInApp"
            @change="onChangePanels(row, 'isDspInApp', $event)"
            label="DSP InApp"
            :disabled="readonly"
          />
          <UCheckbox
            :model-value="row.isDspBanner"
            @change="onChangePanels(row, 'isDspBanner', $event)"
            label="DSP Banner"
            :disabled="readonly"
          />
        </div>
      </template>
    </UiTable>
  </div>
</template>
