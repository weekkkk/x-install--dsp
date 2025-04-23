<script setup lang="ts">
import type { LayoutHeaderWidgetEmits, LayoutHeaderWidgetProps } from "./interfaces";
import type { LayoutHeaderWidgetAction } from "./types";
import { layoutHeaderWidgetActionIcon } from "./consts";

withDefaults(defineProps<LayoutHeaderWidgetProps>(), {
  actions: () => [],
});
const emit = defineEmits<LayoutHeaderWidgetEmits>();

async function onAction(action: LayoutHeaderWidgetAction) {
  await new Promise(r => emit(action, () => r("")));
};
</script>

<template>
  <header class="flex justify-between mx-12.5 mt-8.75">
    <div class="w-full flex justify-start">
      <UButton
        to="/" variant="ghost" :ui="{
          leadingIcon: 'size-10.5',
          base: 'p-2.25',
        }" class="-mx-3.5" icon="xii:logo"
      />
    </div>
    <div />
    <div class="w-full flex justify-end gap-5">
      <UButton
        v-for="action in actions" :key="action"
        :icon="layoutHeaderWidgetActionIcon[action]"
        :class="{ 'rotate-45': action === 'toggle' && toggleValue }"
        color="neutral" size="sm"
        @click="onAction(action)"
      />

      <AuthUserIdFeature v-if="userId === undefined" />
      <template v-else>
        <UserNicknameFeature :id="userId" />
        <UserIdFeature :id="userId" />
      </template>

      <AuthUserAvatarFeature @login="(resolve) => emit('login', resolve)" @logout="(resolve) => emit('logout', resolve)" />
    </div>
  </header>
</template>
