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
      if (route.path === "/login") await navigateTo("/");
      user.value = data.user;
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
      <UIcon name="xi-i:logo" class="animate-pulse text-9xl" />
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
