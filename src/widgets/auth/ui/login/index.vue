<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

const state = reactive<Partial<AuthLoginReqDto>>({});

async function onSubmit(event: FormSubmitEvent<AuthLoginReqDto>) {
  await AuthApiService.login(event.data);
}
</script>

<template>
  <UForm loading-auto :schema="authLoginReqDtoScheme" :state="state" class="space-y-2.5" @submit="onSubmit">
    <UFormField name="login">
      <UInput v-model="state.login" placeholder="Login" />
    </UFormField>

    <UFormField name="password">
      <UInput v-model="state.password" placeholder="Password" type="password" />
    </UFormField>

    <UButton loading-auto type="submit" class="w-full mt-2.5">
      Continue
    </UButton>
  </UForm>
  <UButton loading-auto class="w-full mt-2.5" @click="AuthApiService.checkAuth()">
    Refresh
  </UButton>
</template>
