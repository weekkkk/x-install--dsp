<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div class="h-screen flex flex-col justify-center items-center">
    <header class="fixed inset-x-0 top-0 p-20" v-show="route.path !== '/login'">
      <UButton
        icon="xi:back"
        size="xs"
        variant="link"
        color="white"
        @click="() => navigateTo({ path: '/users', query: { mode: 'view' } })"
      />
    </header>
    <main class="w-[32.5rem]">
      <NuxtPage />
    </main>
  </div>
</template>
