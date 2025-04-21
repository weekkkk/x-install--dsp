<script setup lang="ts">
async function onLogout(resolve: () => void) {
  await navigateTo("/login");
  resolve();
}
</script>

<template>
  <div>
    <AuthLogoutFeature @success="onLogout" />
  </div>
  <NuxtPage />
</template>
