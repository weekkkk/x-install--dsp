<script setup lang="ts">
definePageMeta({
  layout: "form",
  middleware: "auth",
});

useSeoMeta({
  title: "Login",
});
</script>

<template>
  <LoginPage />
</template>
