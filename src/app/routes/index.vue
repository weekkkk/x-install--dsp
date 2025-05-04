<script setup lang="ts">
definePageMeta({
  middleware: "role-default",
});

useSeoMeta({
  title: "Index",
});

const user = useAuthApiUser();
</script>

<template>
  <article class="h-full flex flex-col justify-center items-center gap-4">
    <h1 v-if="!user" class="text-3xl text-center">
      Login to your account
    </h1>
    <h1 v-else class="text-3xl text-center">
      You do not have access to any panel, please contact the administrator
    </h1>
  </article>
</template>
