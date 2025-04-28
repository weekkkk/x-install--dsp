<script setup lang="ts">
import type { UserIdProps } from "./interfaces";

defineProps<UserIdProps>();
</script>

<template>
  <UButton color="neutral" size="sm" class="whitespace-nowrap">
    Id: {{ id }}
  </UButton>
</template>
