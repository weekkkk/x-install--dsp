<script setup lang="ts">
const expanded = ref(false);
const onClick = () => (expanded.value = !expanded.value);
</script>

<template>
  <div
    class="transition-all overflow-hidden rounded-full w-full min-w-24 max-md:min-w-20"
    :class="{
      'max-w-24 max-md:max-w-20': !expanded,
      'max-w-[22.5rem] p-2 -m-2': expanded,
    }"
  >
    <UInput
      :ui="{
        base: 'font-semibold',
        rounded: 'rounded-full',
        size: {
          sm: 'text-xl',
        },
        padding: {
          sm: 'py-[2.15rem] px-8 max-md:py-[1.65rem] max-md:px-6',
        },
        leading: {
          padding: {
            sm: 'ps-24 max-md:ps-20',
          },
        },
        icon: {
          leading: {
            pointer: 'pointer-events-auto',
            padding: {
              sm: 'p-0',
            },
          },
        },
        color: {
          white: { outline: 'dark:bg-dark-50 ring-0' },
        },
      }"
      class="w-full"
    >
      <template #leading>
        <UButton icon="xi-i:search" color="gray" @click="onClick" />
      </template>
    </UInput>
  </div>
</template>
