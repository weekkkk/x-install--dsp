<script setup lang="ts">
definePageMeta({
  middleware: "admin",
});

useSeoMeta({
  title: "User List",
});
</script>

<template>
  <UserListPage />
</template>
