<script setup lang="ts">
import type { TUsersPageProps } from "./types";

const props = defineProps<TUsersPageProps>();
</script>

<template>
  <UserTableWidget :mode="query.mode" />
</template>
