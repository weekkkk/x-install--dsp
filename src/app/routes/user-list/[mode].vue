<script setup lang="ts">
definePageMeta({
  middleware: "admin",
  actions: ["search", "delete-mode", "add", "toggle"] as LayoutHeaderWidgetProps["actions"],
  mdActions: [["toggle", "add", "delete-mode"]] as LayoutHeaderWidgetProps["mdActions"],
  defaultMode: "select",
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

    const { data } = useNuxtData<Awaited<ReturnType<typeof UserApiService.getAll>>>("user-list");
    const user = data.value?.find(({ id }) => id === ids[0]);
    if (!user)
      return;
    let panel: UserPanel | undefined;
    if (user.isXInstallApp)
      panel = "install";
    else if (user.isDsp)
      panel = "dsp";
    else if (user.isDspInApp)
      panel = "dsp-in-app";
    else if (user.isDspBanner)
      panel = "dsp-banner";
    if (!panel)
      return;
    navigateTo(`/user-${ids[0]}/panel-${panel}/create`);
  },
  onAdd: () => {
    // const _ids = useRoute().query.ids;
    navigateTo({ path: `/user-create`, query: { ...useRoute().query } });
  },
});

useSeoMeta({
  title: "User List",
});
</script>

<template>
  <UserListPage />
</template>
