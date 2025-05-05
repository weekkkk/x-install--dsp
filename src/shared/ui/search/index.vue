<script setup lang="ts">
const $input = useTemplateRef<{ inputRef: HTMLInputElement }>("input");

function open() {
  $input.value?.inputRef.focus();
}

const route = useRoute();

const value = computed({
  get: () => route.query.search?.toString(),
  set: (v) => {
    navigateTo({ query: { ...route.query, search: v || undefined } });
  },
});
</script>

<template>
  <UInput ref="input" v-model="value" placeholder="Search..." :ui="{ base: 'p-0 h-15 max-md:h-12.5 rounded-full ps-15 max-md:ps-12.5 ring-0 w-0 focus:w-80 max-md:focus:w-full focus:z-10 bg-transparent focus:pr-3', root: 'w-fit bg-neutral-900 rounded-full', leading: 'ps-0.5' }">
    <template #leading>
      <UButton icon="xii:search" color="neutral" size="sm" @click="open" />
    </template>
  </UInput>
</template>
