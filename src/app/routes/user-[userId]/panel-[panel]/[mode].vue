<script setup lang="ts">
definePageMeta({
  middleware: "admin",
  actions: ["delete-mode", "toggle"] as LayoutHeaderWidgetProps["actions"],
  mdActions: [["toggle", "delete-mode"], ["create"]] as LayoutHeaderWidgetProps["mdActions"],
  toggleValue: false,
  defaultMode: "create",
  dateFilter: true,
  panelFilter: true,
  onToggle: () => {
    const userId = Number(useRoute().params.userId);
    if (!userId && userId !== 0)
      return;
    navigateTo({ path: "/user-list/select", query: { ids: JSON.stringify([userId]) } });
  },
  onCreate: async () => {
    const panel = useRoute().params.panel as UserPanel;

    const { data } = useNuxtData(`${panel}-stat-list`);

    if (!data.value)
      return;

    const { id, ...createStat } = data.value.userStatistics[0];
    const userId = useRoute().params.userId;

    if (typeof userId !== "string" || id !== -1)
      return;

    if (panel === "install") {
      await InstallStatApiService.create({ userId: Number(userId), ...createStat });
    }
    else {
      await DspStatApiService.create({
        userId: Number(userId),
        ...createStat,
        isDsp: panel === "dsp",
        isDspInApp: panel === "dsp-in-app",
        isDspBanner: panel === "dsp-banner",
      });
    }

    refreshNuxtData(`${panel}-stat-list`);
  },
  onDelete: async () => {
    const panel = useRoute().params.panel as UserPanel;
    const _ids = useRoute().query.ids;
    const ids = _ids ? JSON.parse(_ids.toString()) : undefined;
    if (!ids)
      return;
    if (panel === "install")
      await InstallStatApiService.deleteByIds(ids);
    else
      await DspStatApiService.deleteByIds(ids);

    refreshNuxtData(`${panel}-stat-list`);
  },
});

useSeoMeta({
  title: "User Panels",
});
</script>

<template>
  <PanelPage />
</template>
