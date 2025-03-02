<script setup lang="ts">
import { typesConst } from "./consts";

const type = defineModel<keyof typeof typesConst>();

const onClick = (key: string) => {
  type.value = key as keyof typeof typesConst;
};
</script>

<template>
  <UButton
    v-for="[key, { name }] in Object.entries(typesConst)"
    :key="key"
    class="w-32"
    v-bind="key === type ? {} : { color: 'white', variant: 'ghost' }"
    @click="onClick(key)"
  >
    {{ name }}
  </UButton>
</template>
