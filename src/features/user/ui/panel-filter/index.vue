<script setup lang="ts">
import type { UserPanelFilterFeatureProps } from "./interfaces";

const props = defineProps<UserPanelFilterFeatureProps>();

const { data: user } = useAsyncData(`user-${props.id}`, () => UserApiService.getOne(props.id));

const tabs: { value: UserPanel; label: string }[] = [
  { value: "install", label: userPanelName.install },
  { value: "dsp", label: userPanelName.dsp },
  { value: "dsp-in-app", label: userPanelName["dsp-in-app"] },
  { value: "dsp-banner", label: userPanelName["dsp-banner"] },
];

const _tabs = computed(() => tabs.filter(({ value }) => {
  return (value === "install" && user.value?.isXInstallApp)
    || (value === "dsp" && user.value?.isDsp)
    || (value === "dsp-in-app" && user.value?.isDspInApp)
    || (value === "dsp-banner" && user.value?.isDspBanner);
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
  <UiButtonTabs v-model="tab" :tabs="_tabs" />
</template>
