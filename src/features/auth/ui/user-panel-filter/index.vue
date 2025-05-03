<script setup lang="ts">
const user = useAuthApiUser();
</script>

<template>
  <UserPanelFilter
    :is-x-install-app="user?.isXInstallApp"
    :is-dsp="user?.isDsp"
    :is-dsp-in-app="user?.isDspInApp"
    :is-dsp-banner="user?.isDspBanner"
  />
</template>
