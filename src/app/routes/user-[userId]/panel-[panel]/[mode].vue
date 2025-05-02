<script setup lang="ts">
definePageMeta({
  middleware: "admin",
  actions: ["delete-mode", "toggle"] as LayoutHeaderWidgetProps["actions"],
  mdActions: [["toggle", "delete-mode"], ["create"]] as LayoutHeaderWidgetProps["mdActions"],
  toggleValue: false,
  defaultMode: "create",
  dateFilter: true,
  onToggle: () => {
    const userId = Number(useRoute().params.userId);
    if (!userId && userId !== 0)
      return;
    navigateTo({ path: "/user-list/select", query: { ids: JSON.stringify([userId]) } });
  },
  onCreate: async () => {
    const { data } = useNuxtData<Awaited<ReturnType<typeof InstallStatApiService.getAll>>>("install-stat-list");
    if (!data.value)
      return;
    const { id, ...createStat } = data.value.userStatistics[0];
    const userId = useRoute().params.userId;
    if (typeof userId !== "string" || id !== -1)
      return;
    await InstallStatApiService.create({ userId: Number(userId), ...createStat });
    refreshNuxtData("install-stat-list");
  },
  onDelete: async () => {
    const _ids = useRoute().query.ids;
    const ids = _ids ? JSON.parse(_ids.toString()) : undefined;
    if (!ids)
      return;
    await InstallStatApiService.deleteByIds(ids);
    refreshNuxtData("install-stat-list");
  },
});

useSeoMeta({
  title: "User Panels",
});
</script>

<template>
  <PanelPage />
</template>
