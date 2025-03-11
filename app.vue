<script setup lang="ts">
const isLoading = ref(true);
const auth = useState<boolean>("auth");
const user = useState<AuthResDto["user"] | undefined>("user");

const route = useRoute();

console.log("test");

onMounted(() => {
  AuthApiService.checkAuth()
    .then(async (data) => {
      auth.value = true;
      user.value = data.user;
      if (route.path === "/login") await navigateTo("/");
      console.log(
        user.value.role === "Admin" && route.path === "/" && !route.query.user
      );
      if (
        user.value.role === "Admin" &&
        route.path === "/" &&
        !route.query.user
      )
        await navigateTo("/users");
      if (
        user.value.role !== "Admin" &&
        route.path === "/users"
      )
        await navigateTo("/");
    })
    .catch(async () => {
      await navigateTo("/login");
    })
    .finally(() => {
      isLoading.value = false;
    });
});
</script>

<template>
  <Transition>
    <div
      class="bg-black flex items-center justify-center fixed inset-0 z-[9999]"
      v-if="isLoading"
    >
      <UIcon name="xi-logo" class="animate-pulse text-9xl" />
    </div>
  </Transition>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
  transition-delay: 0.5s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
