<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <UiSearch
    :model-value="route.query.search?.toString()"
    @update:model-value="
      navigateTo({ query: { ...route.query, search: $event } })
    "
  />
</template>
