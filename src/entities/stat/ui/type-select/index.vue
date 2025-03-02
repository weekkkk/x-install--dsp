<script setup lang="ts">
import { typesConst } from "./consts";

const type = defineModel<keyof typeof typesConst>();

const onClick = (key: string) => {
  type.value = key as keyof typeof typesConst;
};

const options = computed((): TUiButtonSelectOption[] =>
  Object.entries(typesConst).map(([key, { name: label }]) => ({ key, label }))
);
const typeOption = computed({
  get: () => options.value.find(({ key }) => key === type.value),
  set: (v) => {
    type.value = v && (v.key as keyof typeof typesConst);
  },
});
</script>

<template>
  <div class="max-md:hidden flex gap-8">
    <UButton
      v-for="[key, { name }] in Object.entries(typesConst)"
      :key="key"
      class="w-32"
      v-bind="key === type ? {} : { color: 'white', variant: 'ghost' }"
      @click="onClick(key)"
    >
      {{ name }}
    </UButton>
  </div>
  <div class="md:hidden">
    <UiButtonSelect
      v-model="typeOption"
      :options="options"
      selected-color="primary"
    />
  </div>
</template>
