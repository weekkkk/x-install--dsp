<script setup lang="ts">
import type { UserNicknameProps } from "./interfaces";

withDefaults(defineProps<UserNicknameProps>(), { nickname: "nickname" });
</script>

<template>
  <UButton color="neutral" size="sm">
    {{ nickname }}
  </UButton>
</template>
