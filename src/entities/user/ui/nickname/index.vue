<script setup lang="ts">
import type { UserNicknameProps } from "./interfaces";

withDefaults(defineProps<UserNicknameProps>(), { nickname: "nickname", color: "neutral" });
</script>

<template>
  <UButton :color="color" size="sm">
    {{ nickname }}
  </UButton>
</template>
