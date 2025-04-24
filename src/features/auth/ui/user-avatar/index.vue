<script setup lang="ts">
import type { AuthAvatarFeatureEmits } from "./interfaces";

const emit = defineEmits<AuthAvatarFeatureEmits>();

const user = useAuthApiUser();
</script>

<template>
  <div class="inline-flex">
    <UPopover v-if="user" :content="{ sideOffset: 0 }" :ui="{ content: 'bg-transparent ring-0' }">
      <div class="inline-block">
        <UAvatar
          :ui="{
            root: 'bg-linear-to-r from-(--ui-secondary) to-(--ui-primary)',
            fallback: 'text-black font-semibold',
          }"
          :alt="user?.login"
        />
      </div>
      <template #content>
        <AuthLogoutFeature
          class="mt-1.25" @success="emit('logout')"
        />
      </template>
    </UPopover>

    <UButton v-else color="neutral" size="sm" class="w-33.75" @click="emit('login')">
      Login
    </UButton>
  </div>
</template>
