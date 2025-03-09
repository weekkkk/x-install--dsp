<script setup lang="ts">
import type { TStatTotalItemProps } from "./types";

const props = defineProps<TStatTotalItemProps>();
</script>

<template>
  <div
    class="flex flex-col gap-6 max-md:gap-2 items-center w-full max-md:w-[calc(50%-0.5rem)]"
    :class="{ 'max-md:bg-dark-50 py-12 rounded-[2rem]': !large }"
  >
    <span class="text-white font-semibold text-base">
      {{ label }}
    </span>

    <span
      class="text-transparent bg-gradient-to-r from-brand-from to-brand-to bg-clip-text font-medium"
      :class="{
        'text-6xl max-md:text-3xl': !large,
        'text-[10rem] leading-[8rem] max-md:text-[5rem] max-md:leading-[6rem]':
          large,
      }"
    >
      {{
        (value || 0)
          .toLocaleString("ru-RU", { maximumFractionDigits: 2 })
          .replace(",", ".")
      }}{{ procent ? "%" : "" }}
    </span>
  </div>
</template>
