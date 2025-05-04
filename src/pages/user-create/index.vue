<script setup lang="ts">
async function goToUsers() {
  await navigateTo({ path: "/user-list/select", query: { ...useRoute().query } });
}
</script>

<template>
  <UButton icon="xii:arrow-left" class="fixed left-12.5 top-12.5 max-md:left-5 max-md:top-5" color="neutral" size="lg" variant="ghost" @click="goToUsers" />
  <UserCreateWidget @success="goToUsers" />
</template>
