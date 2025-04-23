<script setup lang="ts">
const route = useRoute();

const userId = computed(() => {
  const id = route.params.userId;
  if (!id)
    return;
  return Number(id);
});

async function goToLogin(resolve: () => void) {
  await navigateTo("/login");
  resolve();
}

const actions = computed((): LayoutHeaderWidgetProps["actions"] => {
  return route.meta.actions as LayoutHeaderWidgetProps["actions"];
});

const toggleValue = computed((): LayoutHeaderWidgetProps["toggleValue"] => {
  return !!route.meta.toggleValue;
});
</script>

<template>
  <LayoutHeaderWidget :user-id="userId" :actions="actions" :toggle-value="toggleValue" @login="goToLogin" @logout="goToLogin" />
  <main class="px-2.5 max-md:px-0">
    <NuxtPage />
  </main>
</template>
