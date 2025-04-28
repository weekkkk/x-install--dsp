<script setup lang="ts">
import type { UserPanelEditorFeatureProps } from "./interfaces";

const props = defineProps<UserPanelEditorFeatureProps>();

const panels: UserPanel[] = ["install", "dsp", "dsp-in-app", "dsp-in-banner"];

const values = reactive<Record<UserPanel, boolean>>({
  "install": !!props.defaultValues?.isXInstallApp,
  "dsp": !!props.defaultValues?.isDsp,
  "dsp-in-app": !!props.defaultValues?.isDspInApp,
  "dsp-in-banner": !!props.defaultValues?.isDsp,
});

watch(values, (_values) => {
  UserApiService.changeFlags({
    id: props.id,
    isXInstallApp: _values.install,
    isDsp: _values.dsp,
    isDspInApp: _values["dsp-in-app"],
    isDspBanner: _values["dsp-in-banner"],
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
