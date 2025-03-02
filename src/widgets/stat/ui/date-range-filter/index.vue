<script setup lang="ts">
const dates = ref();
</script>

<template>
  <StatDateRangePicker @change="dates = $event" />
</template>
