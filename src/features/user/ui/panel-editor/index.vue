<script setup lang="ts">
import type { UserPanelEditorFeatureProps } from "./interfaces";

const props = defineProps<UserPanelEditorFeatureProps>();

const userPanelName: Record<UserPanel, string> = {
  "install": "X-instal App",
  "dsp": "DSP",
  "dsp-in-app": "DSP In App",
  "dsp-banner": "DSP Banner",
};

const panels: UserPanel[] = ["install", "dsp", "dsp-in-app", "dsp-banner"];

const isXInstallApp = defineModel<UserResDto["isXInstallApp"]>("install");
const isDsp = defineModel<UserResDto["isDsp"]>("dsp");
const isDspInApp = defineModel<UserResDto["isDspInApp"]>("dsp-in-app");
const isDspBanner = defineModel<UserResDto["isDspBanner"]>("dsp-banner");

const values = reactive<Record<UserPanel, boolean>>({
  "install": !!isXInstallApp.value,
  "dsp": !!isDsp.value,
  "dsp-in-app": !!isDspInApp.value,
  "dsp-banner": !!isDspBanner.value,
});

watch(values, (_values) => {
  isXInstallApp.value = _values.install;
  isDsp.value = _values.dsp;
  isDspInApp.value = _values["dsp-in-app"];
  isDspBanner.value = _values["dsp-banner"];

  UserApiService.changeFlags({
    id: props.id,
    isXInstallApp: _values.install,
    isDsp: _values.dsp,
    isDspInApp: _values["dsp-in-app"],
    isDspBanner: _values["dsp-banner"],
  });
});
</script>

<template>
  <div class="flex gap-10">
    <UCheckbox
      v-for="panel in panels" :key="panel"
      v-model="values[panel]" :label="userPanelName[panel]"
      :ui="{ root: 'flex-row-reverse items-center', wrapper: 'ms-0 me-1.25 !text-base-sm', container: 'h-3', base: 'size-3 rounded-xs' }"
    />
  </div>
</template>
