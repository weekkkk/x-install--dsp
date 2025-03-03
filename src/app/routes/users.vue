<script setup lang="ts">
definePageMeta({
  validate: async (to) => {
    try {
      usersPageQueryShema.parse(to.query);
      return true;
    } catch {
      return false;
    }
  },
});

const route = useRoute();
</script>

<template>
  <UsersPage :query="usersPageQueryShema.parse(route.query)" />
</template>
