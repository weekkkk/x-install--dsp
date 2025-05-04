<script setup lang="ts">
const $input = useTemplateRef<{ inputRef: HTMLInputElement }>("input");

function open() {
  $input.value?.inputRef.focus();
}
</script>

<template>
  <UInput ref="input" :ui="{ base: 'p-0 h-15 max-md:h-12.5 rounded-full ps-15 max-md:ps-12.5 ring-0 w-0 focus:w-45 max-md:focus:w-full focus:z-10 bg-transparent', root: 'w-fit bg-neutral-900 rounded-full', leading: 'ps-0.5' }">
    <template #leading>
      <UButton icon="xii:search" color="neutral" size="sm" @click="open" />
    </template>
  </UInput>
</template>
