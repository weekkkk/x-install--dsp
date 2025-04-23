<script setup lang="ts">
import type { UserIdProps } from "./interfaces";

defineProps<UserIdProps>();
</script>

<template>
  <UButton color="neutral" size="sm">
    Id: {{ id }}
  </UButton>
</template>
