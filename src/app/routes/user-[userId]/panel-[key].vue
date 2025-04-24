<script setup lang="ts">
definePageMeta({
  middleware: "admin",
  actions: ["delete", "toggle"] as LayoutHeaderWidgetProps["actions"],
  toggleValue: false,
});

useSeoMeta({
  title: "User Panels",
});
</script>

<template>
  <h1>src\app\routes\user-[userId]\panel-[key].vue</h1>
</template>
