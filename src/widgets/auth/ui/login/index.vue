<script setup lang="ts">
const error = reactive<Partial<Record<keyof TAuthLoginFormData, string>>>({
  login: "",
  password: "",
});

const onSubmit = async ({ login: email, password }: TAuthLoginFormData) => {
  try {
    await AuthApiService.login({
      email,
      password,
    });
  } catch (e) {
    if (!(e && typeof e === "object" && "data" in e)) return;
    error.login = e.data + "";
    error.password = e.data + "";
  }
};
</script>

<template>
  <AuthLoginForm
    @submit="onSubmit"
    @blur="(key) => (error[key] = '')"
    :error="error"
  />
</template>
