<script setup lang="ts">
import type { UserPanelEditorFeatureProps } from "./interfaces";

const props = defineProps<UserPanelEditorFeatureProps>();

const panels: UserPanel[] = ["install", "dsp", "dsp-in-app", "dsp-in-banner"];

const values = reactive<Record<UserPanel, boolean | undefined>>({
  "install": props.defaultValues?.isXInstallApp,
  "dsp": props.defaultValues?.isDsp,
  "dsp-in-app": props.defaultValues?.isDspInApp,
  "dsp-in-banner": props.defaultValues?.isDsp,
});
</script>

<template>
  <div class="flex gap-10">
    <UCheckbox
      v-for="panel in panels" :key="panel"
      :model-value="values[panel]" :label="userPanelName[panel]"
      :ui="{ root: 'flex-row-reverse', wrapper: 'ms-0 me-1.25 !text-base-sm', container: 'h-4.5', base: 'size-4.5' }"
    />
  </div>
</template>
