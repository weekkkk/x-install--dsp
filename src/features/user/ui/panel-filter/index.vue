<script setup lang="ts">
const tabs: { value: UserPanel; label: string }[] = [
  { value: "install", label: userPanelName.install },
  { value: "dsp", label: userPanelName.dsp },
  { value: "dsp-in-app", label: userPanelName["dsp-in-app"] },
  { value: "dsp-banner", label: userPanelName["dsp-banner"] },
];

const route = useRoute();

const tab = computed({
  get: () => route.params.panel as string,
  set: (panel) => {
    navigateTo({ params: { panel }, query: { ...route.query } });
  },
});
</script>

<template>
  <UiButtonTabs v-model="tab" :tabs="tabs" />
</template>
