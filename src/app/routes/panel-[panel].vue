<script setup lang="ts">
import { startOfToday, startOfTomorrow } from "date-fns";

definePageMeta({
  middleware: "user",
  dateFilter: true,
  panelFilter: true,
  actions: ["export"] as LayoutHeaderWidgetProps["actions"],
  onExport: async (key: "pdf" | "excel") => {
    const route = useRoute();
    const panel = route.params.panel as UserPanel;

    const { data } = useNuxtData(`${panel}-stat-list`);

    if (!data.value)
      return;

    const userId = useAuthApiUser().value?.id;
    const rangeQuery = route.query.dateRange as string | undefined;
    let range = { start: startOfToday().toISOString(), end: startOfTomorrow().toISOString() };
    if (rangeQuery) {
      const [start, end] = rangeQuery.split(" - ");
      range = { start, end };
    }

    if (userId === undefined)
      return;
    let blob: Blob | undefined;
    if (panel === "install") {
      blob = await InstallStatApiService[key === "excel" ? "exportExcel" : "exportPdf"]({ UserId: userId, StartDate: range.start, EndDate: range.end });
    }
    else {
      blob = await DspStatApiService[key === "excel" ? "exportExcel" : "exportPdf"]({ UserId: userId, StartDate: range.start, EndDate: range.end, IsDsp: panel === "dsp", IsDspInApp: panel === "dsp-in-app", IsDspBanner: panel === "dsp-banner" });
    }
    if (!blob)
      return;

    const name = key === "excel" ? "Excel.xlsx" : "PDF.pdf";

    donwload(blob, name);
  },
});

useSeoMeta({
  title: "Panels",
});
</script>

<template>
  <PanelPage />
</template>
