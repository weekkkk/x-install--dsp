<script setup lang="ts">
async function goToLogin(resolve: () => void) {
  await navigateTo("/login");
  resolve();
}
</script>

<template>
  <LayoutHeaderWidget @login="goToLogin" @logout="goToLogin" />
  <NuxtPage />
</template>
