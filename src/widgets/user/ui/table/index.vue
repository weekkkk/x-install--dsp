<script setup lang="ts">
import type { TUserTableWidgetProps } from "./types";

const props = defineProps<TUserTableWidgetProps>();

const test: TUser[] = [
  {
    id: "32332",
    dateAdd: "",
    nickname: "test",
    panels: {
      dsp: true,
      "dsp--banner": false,
      "dsp--in-app": false,
    },
  },
  {
    id: "3223",
    dateAdd: "",
    panels: {
      dsp: false,
      "dsp--banner": true,
      "dsp--in-app": false,
    },
  },
];

const userId = ref<TUser["id"]>();

const userForDeleteIds = ref<TUser["id"][]>();

watch(
  () => props.mode,
  () => (userForDeleteIds.value = [])
);
</script>

<template>
  <UserTable
    v-model="userId"
    v-model:multi="userForDeleteIds"
    :users="test"
    :selectable="mode === 'view'"
    :multi-selectable="mode === 'del'"
  />

  <div
    class="z-50 fixed bottom-0 left-1/2 -translate-x-1/2 pb-20 max-md:pb-8 max-md:pr-8 max-md:right-0 max-md:left-auto max-md:translate-x-0"
  >
    <UButton class="w-[13.4rem]" v-if="mode === 'view'"> Save </UButton>
    <UButton class="w-[13.4rem]" v-else-if="mode === 'del'"> Delete </UButton>
  </div>
</template>
