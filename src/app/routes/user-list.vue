<script setup lang="ts">
definePageMeta({
  middleware: "admin",
  actions: ["search", "delete-mode", "add", "toggle"] as LayoutHeaderWidgetProps["actions"],
  action: "delete" as LayoutHeaderWidgetProps["action"],
  mdActions: [["toggle", "add", "delete-mode"], ["delete"]] as LayoutHeaderWidgetProps["mdActions"],
  toggleValue: true,
});

useSeoMeta({
  title: "User List",
});
</script>

<template>
  <UserListPage />
</template>
