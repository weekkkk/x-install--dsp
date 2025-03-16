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

    if (data.user.role === "Admin")
      navigateTo({
        path: "/users",
        query: {
          mode: "view",
        },
      });
    else
      navigateTo({
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
  <div class="flex flex-col gap-[7.5rem] items-center">
    <UIcon name="xi:logo" class="text-[3rem]" />
    <span class="text-5xl font-semibold">Welcome</span>

    <AuthLoginForm
      class="w-full"
      @submit="onSubmit"
      @blur="(key) => (error[key] = '')"
      :error="error"
    />
  </div>
</template>
