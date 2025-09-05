<script setup lang="ts">
import { startOfToday, startOfTomorrow } from "date-fns";

definePageMeta({
  middleware: "admin",
  actions: ["delete-mode", "toggle", "export"] as LayoutHeaderWidgetProps["actions"],
  mdActions: [["toggle", "delete-mode"]] as LayoutHeaderWidgetProps["mdActions"],
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
  onExport: async (key: "pdf" | "excel") => {
    const route = useRoute();
    const panel = route.params.panel as UserPanel;

    const { data } = useNuxtData(`${panel}-stat-list`);

    if (!data.value)
      return;

    const userId = route.params.userId;
    const rangeQuery = route.query.dateRange as string | undefined;
    let range = { start: startOfToday().toISOString(), end: startOfTomorrow().toISOString() };
    if (rangeQuery) {
      const [start, end] = rangeQuery.split(" - ");
      range = { start, end };
    }

    if (typeof userId !== "string")
      return;
    let blob: Blob | undefined;
    if (panel === "install") {
      blob = await InstallStatApiService[key === "excel" ? "exportExcel" : "exportPdf"]({
        UserId: Number(userId),
        StartDate: range.start,
        EndDate: range.end,
        TimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
    }
    else {
      blob = await DspStatApiService[key === "excel" ? "exportExcel" : "exportPdf"]({
        UserId: Number(userId),
        StartDate: range.start,
        EndDate: range.end,
        IsDsp: panel === "dsp",
        IsDspInApp: panel === "dsp-in-app",
        IsDspBanner: panel === "dsp-banner",
        TimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
    }
    if (!blob)
      return;

    const name = key === "excel" ? "Excel.xlsx" : "PDF.pdf";

    donwload(blob, name);
  },
});

useSeoMeta({
  title: "User Panels",
});
</script>

<template>
  <PanelPage />
</template>
