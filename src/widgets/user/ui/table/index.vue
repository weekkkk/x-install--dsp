<script setup lang="ts">
import type { TUserTableWidgetProps } from "./types";

const props = defineProps<TUserTableWidgetProps>();

const loading = ref(false);

const mode = defineModel<"view" | "del">("mode", { default: "view" });

const auth = useState<boolean>("auth");

const route = useRoute()

const { data, status, refresh } = await useAsyncData(
  "users",
  async () => (auth.value ? await UserApiService.getAll() : []),
  {
    watch: [auth, mode, () => route.path],
    immediate: true,
  }
);

const userId = defineModel<UserResDto["id"]>();

const userForDeleteIds = ref<UserResDto["id"][]>([]);

const deleteUsers = async () => {
  if (!userForDeleteIds.value?.length) return;
  const ids = userForDeleteIds.value;
  loading.value = true;
  await UserApiService.deleteByIds(ids);
  loading.value = false;
  if (userId.value && ids.includes(userId.value)) userId.value = undefined;
  userForDeleteIds.value = [];
  await refresh();
};

watch(mode, () => (userForDeleteIds.value = []));

const users = computed(() => {
  if (!data.value) return [];
  const search = props.search || "";
  if (!search) data.value;
  return data.value.filter(
    ({ username }) =>
      username === null ||
      username?.toLowerCase().includes(search.toLowerCase())
  );
});

const onChangeName = async (id: UserResDto["id"], name: string) => {
  const user = users.value.find(({ id: _id }) => _id === id);
  if (!user) return;

  user.username = name;

  loading.value = true;
  await UserApiService.changeName({ id, name });
  loading.value = false;
};

const onChangeFlags = async (
  id: UserResDto["id"],
  flags: Pick<UserResDto, "isDsp" | "isDspInApp" | "isDspBanner">
) => {
  const user = users.value.find(({ id: _id }) => _id === id);
  if (!user) return;

  user.isDsp = flags.isDsp;
  user.isDspInApp = flags.isDspInApp;
  user.isDspBanner = flags.isDspBanner;

  loading.value = true;
  await UserApiService.changeFlags({ id, ...flags });
  loading.value = false;
};
</script>

<template>
  <UserTable
    v-model="userId"
    v-model:multi="userForDeleteIds"
    :users="users"
    :selectable="mode === 'view'"
    :multi-selectable="mode === 'del'"
    :readonly="mode === 'del'"
    :loading="status === 'pending'"
    @change-name="onChangeName"
    @change-flags="onChangeFlags"
  />

  <div
    class="z-50 fixed bottom-0 left-1/2 -translate-x-1/2 pb-20 max-md:pb-8 max-md:pr-8 max-md:right-0 max-md:left-auto max-md:translate-x-0"
  >
    <UButton
      class="w-[13.4rem]"
      v-if="mode === 'view'"
      :ui="{
        icon: {
          size: {
            sm: 'h-[1rem] w-[1rem]',
          },
        },
      }"
      :loading="loading"
    >
      Save
    </UButton>
    <UButton
      :ui="{
        icon: {
          size: {
            sm: 'h-[1rem] w-[1rem]',
          },
        },
      }"
      class="w-[13.4rem]"
      v-else-if="mode === 'del'"
      @click="deleteUsers"
      :loading="loading"
    >
      Delete
    </UButton>
  </div>
</template>
