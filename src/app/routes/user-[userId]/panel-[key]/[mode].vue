<script setup lang="ts">
definePageMeta({
  middleware: "admin",
  actions: ["delete-mode", "toggle"] as LayoutHeaderWidgetProps["actions"],
  action: "create" as LayoutHeaderWidgetProps["action"],
  mdActions: [["toggle", "delete-mode"], ["create"]] as LayoutHeaderWidgetProps["mdActions"],
  toggleValue: false,
  onToggle: () => {
    const userId = Number(useRoute().params.userId);
    if (!userId && userId !== 0)
      return;
    navigateTo({ path: "/user-list/select", query: { ids: JSON.stringify([userId]) } });
  },
});

useSeoMeta({
  title: "User Panels",
});
</script>

<template>
  <PanelPage />
</template>
