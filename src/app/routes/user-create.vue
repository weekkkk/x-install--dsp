<script setup lang="ts">
definePageMeta({
  layout: "form",
  middleware: "admin",
});

useSeoMeta({
  title: "User Create",
});
</script>

<template>
  <UserCreatePage />
</template>
