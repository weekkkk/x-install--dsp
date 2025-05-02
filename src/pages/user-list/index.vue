<script setup lang="ts">
const route = useRoute();

const mode = computed(() => route.params.mode as "select" | "delete");

const userIds = computed(() => route.query.ids ? (JSON.parse(route.query.ids.toString()) as number[]) : undefined);
function updateUserIds(ids: number[]) {
  navigateTo({ query: { ids: JSON.stringify(ids) } });
}
</script>

<template>
  <article class="bg-neutral-900 rounded-t-2xl p-10 pb-27.5 h-full max-md:px-0 max-md:pt-5 max-md:pb-17.5">
    <UserTableWidget class="-mt-3" :model-value="userIds" :mode="mode" @update:model-value="updateUserIds" />
  </article>
</template>
