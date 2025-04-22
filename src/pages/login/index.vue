<script setup lang="ts">
async function onSuccess(resolve: () => void) {
  await navigateTo("/");
  resolve();
}
</script>

<template>
  <div class="flex flex-col gap-18.75">
    <header class="flex flex-col items-center gap-18.75">
      <UIcon name="xii:logo" class="text-3xl leading-none" />
      <h1 class="text-2xl font-semibold">
        Welcome
      </h1>
    </header>

    <AuthLoginWidget @success="onSuccess" />
  </div>
</template>
