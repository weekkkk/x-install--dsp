<script setup lang="ts">
const route = useRoute();

const mode = computed(() => route.params.mode as "select" | "delete");

const userIds = computed(() => route.query.ids ? (JSON.parse(route.query.ids.toString()) as number[]) : undefined);
function updateUserIds(ids: number[]) {
  navigateTo({ query: { ids: JSON.stringify(ids) } });
}
const search = computed(() => route.query.search?.toString());
</script>

<template>
  <article
    class="shirk grow bg-neutral-900 rounded-t-2xl p-10 max-md:px-0 max-md:pt-5 flex flex-col overflow-hidden max-md:pb-23.5"
    :class="{ 'pb-30.5': mode === 'delete' }"
  >
    <UserTableWidget class="-my-3" :search="search" :model-value="userIds" :mode="mode" @update:model-value="updateUserIds" />
  </article>
</template>
