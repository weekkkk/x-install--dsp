<script setup lang="ts">
import type { UserNicknameProps } from "./interfaces";

withDefaults(defineProps<UserNicknameProps>(), { nickname: "nickname", color: "neutral" });
</script>

<template>
  <UButton :color="color" size="sm" class="whitespace-nowrap overflow-hidden">
    <span class="w-full overflow-hidden text-ellipsis">
      {{ nickname }}
    </span>
  </UButton>
</template>
