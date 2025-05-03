<script setup lang="ts">
import type { UserMainIndicatorProps } from "./interfaces";

defineProps<UserMainIndicatorProps>();

const n = new Intl.NumberFormat("ru-RU");
const p = new Intl.NumberFormat("ru-RU", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
</script>

<template>
  <div class="flex flex-col text-center gap-5">
    <div class="text-base-sm font-semibold">
      {{ label }}
    </div>

    <div class="font-medium text-10xl max-md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-(--ui-secondary) to-(--ui-primary)">
      {{ percent ? p.format(value) : n.format(value) }}
    </div>
  </div>
</template>
