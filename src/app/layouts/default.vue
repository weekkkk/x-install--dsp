<script setup lang="ts">
const auntificated = ref(true);
const isAdmin = ref(true);
const nickname = ref("1WIN Casino");
const id = ref("1661R");
const name = ref("A");
</script>

<template>
  <UToggle v-model="auntificated" class="fixed bottom-0 left-0" size="xl" />
  <UToggle v-model="isAdmin" class="fixed bottom-0 right-0" size="xl" />

  <div class="h-screen flex flex-col">
    <header class="px-20 py-14 flex justify-between items-center">
      <div class="w-full">
        <UIcon name="xi-i:logo" class="h-12 w-[4.2rem]" />
      </div>

      <div class="flex gap-8">
        <UButton class="w-32"> DSP </UButton>
        <UButton color="white" variant="ghost" class="w-32">
          DSP InApp
        </UButton>
      </div>

      <div v-if="!auntificated">
        <UButton class="w-[13.5rem] text-2xl h-24" color="gray">
          Log in
        </UButton>
      </div>

      <div v-else class="flex justify-end gap-8 w-full">
        <UButton v-if="isAdmin" icon="xi-i:category" color="gray" />
        <UButton v-if="isAdmin" color="gray" class="w-[13.4rem]">
          {{ nickname }}
        </UButton>
        <UButton color="gray" class="w-32"> Id: {{ id }} </UButton>

        <UPopover
          :ui="{
            background: 'dark:bg-transparent',
            ring: 'ring-0',
            rounded: 'rounded-full',
          }"
        >
          <UAvatar :alt="name" />

          <template #panel="{ close }">
            <UButton icon="xi-i:logout" color="gray" @click="close" />
          </template>
        </UPopover>
      </div>
    </header>

    <main class="px-4">
      <NuxtPage />
    </main>
  </div>
</template>
