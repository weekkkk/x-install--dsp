<script setup lang="ts">
const user = useAuthApiUser();
</script>

<template>
  <UserId v-if="user && user.role !== 'Admin'" :id="user.id" />
</template>
