<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
useSeoMeta({
  title: "Panel",
});
</script>

<template>
  <PanelPage />
</template>
