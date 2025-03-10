<script setup lang="ts">
import type { TUsersPageProps } from "./types";
import { usersPageQueryShema, type TUsersPageQuery } from "./shemes";

const route = useRoute();
const parsedQuery = computed(() => usersPageQueryShema.safeParse(route.query));
// watch(
//   parsedQuery,
//   ({ success }) => {
//     if (success) return;
//     console.log("test");
//     const query: TUsersPageQuery = {
//       mode: "view",
//     };
//     navigateTo({ path: "/users", query });
//   },
//   { immediate: true }
// );
</script>

<template>
  <UserTableWidget
    v-if="parsedQuery.data"
    :model-value="Number(parsedQuery.data.user)"
    @update:model-value="
      navigateTo({ query: { ...parsedQuery.data, user: $event } })
    "
    :mode="parsedQuery.data.mode"
    @update:mode="navigateTo({ query: { ...parsedQuery.data, mode: $event } })"
    :search="parsedQuery.data.search"
  />
</template>
