<script setup lang="ts">
import type { UserPanelFilterFeatureProps } from "./interfaces";

const props = defineProps<UserPanelFilterFeatureProps>();

const { data: user } = useAsyncData(`user-${props.id}`, () => UserApiService.getOne(props.id));
</script>

<template>
  <UserPanelFilter
    :is-x-install-app="user?.isXInstallApp"
    :is-dsp="user?.isDsp"
    :is-dsp-in-app="user?.isDspInApp"
    :is-dsp-banner="user?.isDspBanner"
  />
</template>
