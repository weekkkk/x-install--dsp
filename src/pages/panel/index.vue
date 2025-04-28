<script setup lang="ts">
const route = useRoute();

const userId = computed(() => {
  const id = route.params.userId;
  if (!id)
    return;
  return Number(id);
});
</script>

<template>
  <InstallStatTableWidget :user-id="userId" />
</template>
