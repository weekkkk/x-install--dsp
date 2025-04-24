<script setup lang="ts">
definePageMeta({
  middleware: "admin",
  actions: ["delete-mode", "toggle"] as LayoutHeaderWidgetProps["actions"],
  action: "create" as LayoutHeaderWidgetProps["action"],
  mdActions: [["toggle", "delete-mode"], ["create"]] as LayoutHeaderWidgetProps["mdActions"],
  toggleValue: false,
});

useSeoMeta({
  title: "User Panels",
});
</script>

<template>
  <h1>src\app\routes\user-[userId]\panel-[key].vue</h1>
</template>
