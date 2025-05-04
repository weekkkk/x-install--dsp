<script setup lang="ts">
import type { AuthLogoutFeatureEmits } from "./interfaces";

const emit = defineEmits<AuthLogoutFeatureEmits>();

async function onClick() {
  await AuthApiService.logout();
  emit("success");
}
</script>

<template>
  <UButton loading-auto icon="xii:logout" size="sm" color="neutral" class="text-white" @click="onClick" />
</template>
