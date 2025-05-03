<script setup lang="ts">
import type { UserIndicatorProps } from "./interfaces";

withDefaults(defineProps<UserIndicatorProps>(), { value: 0 });

const n = new Intl.NumberFormat("ru-RU");
const p = new Intl.NumberFormat("ru-RU", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
</script>

<template>
  <div class="flex flex-col text-center gap-3.75 max-md:bg-neutral-900 max-md:rounded-2xl max-md:py-7.5">
    <div class="text-base-sm font-semibold">
      {{ label }}
    </div>
    <div class="font-medium text-4xl max-md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-(--ui-secondary) to-(--ui-primary)">
      {{ percent ? p.format(value) : n.format(value) }}
    </div>
  </div>
</template>
