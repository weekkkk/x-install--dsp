<script setup lang="ts">
const error = reactive<Partial<Record<keyof TAuthLoginFormData, string>>>({
  login: "",
  password: "",
});

const auth = useState("auth");
const user = useState<AuthResDto["user"] | undefined>("user");

const onSubmit = async ({ login, password }: TAuthLoginFormData) => {
  try {
    const data = await AuthApiService.login({
      login,
      password,
    });
    auth.value = true;
    user.value = data.user;

    await navigateTo({
      path: "/",
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
