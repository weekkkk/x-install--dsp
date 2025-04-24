<script setup lang="ts">
definePageMeta({
  middleware: "admin",
  actions: ["search", "delete", "add", "toggle"] as LayoutHeaderWidgetProps["actions"],
  toggleValue: true,
});

useSeoMeta({
  title: "User List",
});
</script>

<template>
  <h1>User List</h1>
</template>
