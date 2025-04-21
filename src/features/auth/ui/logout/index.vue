<script setup lang="ts">
import type { AuthLogoutFeatureEmits } from "./interfaces";

const emit = defineEmits<AuthLogoutFeatureEmits>();

async function onClick() {
  await AuthApiService.logout();
  await new Promise(r => emit("success", () => r("")));
}
</script>

<template>
  <UButton loading-auto icon="xii:logout" color="neutral" class="text-white" @click="onClick" />
</template>
