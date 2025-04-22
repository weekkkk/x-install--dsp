<script setup lang="ts">
import type { LayoutHeaderWidgetEmits } from "./interfaces";

const emit = defineEmits<LayoutHeaderWidgetEmits>();
</script>

<template>
  <header>
    <AuthAvatarFeature @login="(resolve) => emit('login', resolve)" @logout="(resolve) => emit('logout', resolve)" />
  </header>
</template>
