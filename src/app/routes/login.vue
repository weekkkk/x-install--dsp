<script setup lang="ts">
definePageMeta({
  layout: "form",
  middleware: "clear-auth",
});

useSeoMeta({
  title: "Login",
});
</script>

<template>
  <LoginPage />
</template>
