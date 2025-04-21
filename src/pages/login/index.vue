<script setup lang="ts">
const { data: users, error } = useAsyncData("users", () => $fetch("https://xinstallbotprofile.onrender.com/api/admin/users", {
  credentials: "include",
  onRequest: ({ options }) => {
    options.headers.set(
      "Authorization",
      `Bearer ${useCookie("accessToken").value}`,
    );
  },
}));
</script>

<template>
  {{ users }}
  {{ error }}
  <div class="flex flex-col gap-18.75">
    <header class="flex flex-col items-center gap-18.75">
      <UIcon name="xii:logo" class="text-3xl leading-none" />
      <h1 class="text-2xl font-semibold">
        Welcome
      </h1>
    </header>

    <AuthLoginWidget />
  </div>
</template>
