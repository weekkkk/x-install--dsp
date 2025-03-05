<script setup lang="ts">
const auth = useState("auth", () => false);

onMounted(() => {
  console.log("test");

  AuthApiService.checkAuth()
    .then(() => {
      auth.value = true;
    })
    .catch((e) => {
      console.log(e);
    });
});
</script>

<template>
  test
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
