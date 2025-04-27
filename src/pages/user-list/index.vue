<script setup lang="ts">
const route = useRoute();

const mode = computed(() => route.params.mode as "select" | "delete");

const userIds = computed(() => route.query.ids ? (JSON.parse(route.query.ids.toString()) as number[]) : undefined);
function updateUserIds(ids: number[]) {
  navigateTo({ query: { ids: JSON.stringify(ids) } });
}
</script>

<template>
  <article class="bg-neutral-900 rounded-t-xl p-10 h-full">
    <UserTableWidget :model-value="userIds" :mode="mode" @update:model-value="updateUserIds" />
  </article>
</template>
