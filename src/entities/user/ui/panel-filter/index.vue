<script setup lang="ts">
import type { UserPanelFilterProps } from "./interfaces";

const props = defineProps<UserPanelFilterProps>();

const tabs: { value: UserPanel; label: string }[] = [
  { value: "install", label: userPanelName.install },
  { value: "dsp", label: userPanelName.dsp },
  { value: "dsp-in-app", label: userPanelName["dsp-in-app"] },
  { value: "dsp-banner", label: userPanelName["dsp-banner"] },
];

const _tabs = computed(() => tabs.filter(({ value }) => {
  return (value === "install" && props.isXInstallApp)
    || (value === "dsp" && props.isDsp)
    || (value === "dsp-in-app" && props.isDspInApp)
    || (value === "dsp-banner" && props.isDspBanner);
}));

const route = useRoute();

const tab = computed({
  get: () => route.params.panel as string,
  set: (panel) => {
    navigateTo({ params: { panel }, query: { ...route.query } });
  },
});
</script>

<template>
  <div class="inline-flex">
    <UiButtonTabs v-model="tab" class="max-md:hidden" :tabs="_tabs" />
    <UiButtonSelect v-model="tab" class="md:hidden" :options="_tabs" />
  </div>
</template>
