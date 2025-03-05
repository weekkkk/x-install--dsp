<script setup lang="ts">
const createUser = async ({ id, name, login, password }: TUserCreateReqDto) => {
  try {
    await UserApiService.create({
      userId: id,
      login,
      password,
      username: name,
    });
    await navidateTo({ path: "/users" });
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <UserCreateForm @submit="createUser" />
</template>
