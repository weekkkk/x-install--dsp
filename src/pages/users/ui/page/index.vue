<script setup lang="ts">
import type { TUsersPageProps } from "./types";
import { usersPageQueryShema, type TUsersPageQuery } from "./shemes";

// const props = defineProps<TUsersPageProps>();

const route = useRoute();
const query = computed(() => usersPageQueryShema.safeParse(route.query));
watch(
  query,
  ({ success }) => {
    if (success) return;
    const query: TUsersPageQuery = {
      mode: "view",
    };
    navigateTo({ query, replace: true });
  },
  { immediate: true }
);
</script>

<template>
  <UserTableWidget
    v-if="query.data"
    :model-value="query.data.user"
    @update:model-value="navigateTo({ query: { ...query.data, user: $event } })"
    :mode="query.data.mode"
  />
</template>
