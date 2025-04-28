<script setup lang="ts">
definePageMeta({
  middleware: "admin",
  actions: ["search", "delete-mode", "add", "toggle"] as LayoutHeaderWidgetProps["actions"],
  mdActions: [["toggle", "add", "delete-mode"], ["delete"]] as LayoutHeaderWidgetProps["mdActions"],
  toggleValue: true,
  onDelete: async () => {
    const _ids = useRoute().query.ids;
    const ids = _ids ? JSON.parse(_ids.toString()) : undefined;
    if (!ids)
      return;
    await UserApiService.deleteByIds(ids);
    refreshNuxtData("user-list");
  },
  onToggle: () => {
    const _ids = useRoute().query.ids;
    const ids = _ids ? JSON.parse(_ids.toString()) as number[] : undefined;
    if (!ids || !ids.length || ids.length > 1)
      return;
    navigateTo(`/user-${ids[0]}/panel-test`);
  },
});

useSeoMeta({
  title: "User List",
});
</script>

<template>
  <UserListPage />
</template>
