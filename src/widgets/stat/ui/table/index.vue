<script setup lang="ts">
const auth = useState<boolean>("auth");

const { data, status, refresh } = await useAsyncData(
  "users",
  async () => (auth.value ? await StatApiService.getAll() : []),
  {
    watch: [auth],
    immediate: true,
  }
);
</script>

<template>
  <StatTable v-if="data" :stats="data" />
</template>
