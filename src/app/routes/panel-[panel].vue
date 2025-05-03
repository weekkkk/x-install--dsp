<script setup lang="ts">
definePageMeta({
  middleware: "user",
  dateFilter: true,
  panelFilter: true,
});

useSeoMeta({
  title: "Panels",
});
</script>

<template>
  <PanelPage />
</template>
