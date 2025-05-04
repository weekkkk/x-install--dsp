<script setup lang="ts">
import type { LayoutHeaderWidgetEmits, LayoutHeaderWidgetProps } from "./interfaces";
import type { LayoutHeaderWidgetAction } from "./types";
import { layoutHeaderWidgetActionIcon } from "./consts";

withDefaults(defineProps<LayoutHeaderWidgetProps>(), {
  actions: () => [],
  mdActions: () => [],
});
const emit = defineEmits<LayoutHeaderWidgetEmits>();

async function onAction(action: LayoutHeaderWidgetAction) {
  emit(action);
};
</script>

<template>
  <header class="flex justify-between mx-12.5 mt-8.75 mb-10 max-md:mx-5 max-md:mt-5 z-30 gap-5 max-md:gap-2.5">
    <div class="w-full flex justify-start max-md:w-fit">
      <UButton
        to="/" variant="ghost" :ui="{
          leadingIcon: 'size-10.5 max-md:size-7.5',
          base: 'p-2.25 max-md:p-1',
        }" class="-mx-2.25 max-md:-mx-1" icon="xii:logo"
      />

      <UiDateRangeFilter v-if="dateFilter" class="ml-27.75 max-md:hidden" />
    </div>
    <div class="max-md:hidden">
      <template v-if="panelFilter">
        <UserPanelFilterFeature v-if="userId !== undefined" :id="userId" />
        <AuthUserPanelFilterFeature v-else />
      </template>
    </div>
    <div class="w-full flex justify-end gap-5 max-md:gap-2.5">
      <template
        v-for="a in actions" :key="a"
      >
        <UiSearch v-if="a === 'search'" />
        <UiExport v-else-if="a === 'export'" :class="{ 'max-md:hidden': mdActions.some((arr) => arr.includes(a)) }" @pdf="emit('export', 'pdf')" @excel="emit('export', 'excel')" />
        <UButton
          v-else
          :icon="layoutHeaderWidgetActionIcon[a].icon"
          :class="{ 'rotate-45': a === 'toggle' && toggleValue, 'max-md:hidden': mdActions.some((arr) => arr.includes(a)) }"
          :color="a.replace('-mode', '') === action ? 'primary' : 'neutral'" size="sm"
          @click="onAction(a)"
        />
      </template>

      <AuthUserIdFeature v-if="userId === undefined" />
      <template v-else>
        <UserNicknameFeature :id="userId" class="max-md:hidden" />
        <UserIdFeature :id="userId" />
      </template>

      <AuthUserAvatarFeature @login="emit('login')" @logout="emit('logout')" />
    </div>
  </header>
  <div class="md:hidden flex gap-2.5 flex-wrap mb-10 mx-5 z-30">
    <UiDateRangeFilter v-if="dateFilter" />

    <template v-if="panelFilter">
      <UserPanelFilterFeature v-if="userId !== undefined" :id="userId" class="max-md:hidden" />
      <AuthUserPanelFilterFeature v-else class="max-md:hidden" />
    </template>
  </div>

  <UButton
    v-if="action"
    class="max-md:hidden fixed left-1/2 bottom-0 -translate-x-1/2 mb-12.5 z-30"
    size="sm"
    @click="onAction(action)"
  >
    {{ layoutHeaderWidgetActionIcon[action].text }}
  </UButton>

  <footer class="flex justify-between md:hidden mx-5 mb-5 fixed bottom-0 left-0 right-0 gap-2.5 z-30">
    <div
      v-for="(actionGroup, index) in mdActions" :key="index"
      class="flex justify-start gap-2.5"
    >
      <template
        v-for="a in actionGroup" :key="a"
      >
        <UiExport v-if="a === 'export'" @pdf="emit('export', 'pdf')" @excel="emit('export', 'pdf')" />
        <UButton
          v-else-if="layoutHeaderWidgetActionIcon[a].text"
          :icon="layoutHeaderWidgetActionIcon[a].icon"
          size="sm"
          @click="onAction(a)"
        >
          {{ layoutHeaderWidgetActionIcon[a].text }}
        </UButton>
        <UButton
          v-else
          :icon="layoutHeaderWidgetActionIcon[a].icon"
          :class="{ 'rotate-45': action === 'toggle' && toggleValue }"
          :color="a.replace('-mode', '') === action ? 'neutral' : 'primary'" size="sm"
          @click="onAction(a)"
        />
      </template>
    </div>
    <div v-if="userId !== undefined" class="flex justify-end overflow-hidden">
      <UserNicknameFeature :id="userId" color="primary" />
    </div>
  </footer>
</template>
