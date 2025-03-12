<script setup lang="ts">
const defaultState = ref<TUserCreateFormData>();

const generateData = async () => {
  const { nickname: name, id, ...rest } = await UserApiService.generateData();
  defaultState.value = { id: id + "", name, ...rest };
};

const createUser = async ({
  id,
  name,
  login,
  password,
}: TUserCreateFormData) => {
  try {
    await UserApiService.create({
      userId: Number(id),
      login,
      password,
      username: name,
    });
    await navigateTo({ path: "/users", query: { mode: "view" } });
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <UserCreateForm
    @generate="generateData"
    :default-state="defaultState"
    @submit="createUser"
  />
</template>
