<script setup lang="ts">
const route = useRoute();

const type = computed({
  get: () => {
    return route.query.panel as "dsp" | "dsp--in-app" | "dsp--banner";
  },
  set: (v) => {
    navigateTo({
      path: "/",
      query: {
        ...route.query,
        panel: v,
      },
    });
  },
});
</script>

<template>
  <StatTypeSelect v-model="type" />
</template>
