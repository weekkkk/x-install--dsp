<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import type { AuthLoginWidgetEmits } from "./interfaces";

const emit = defineEmits<AuthLoginWidgetEmits>();

const state = reactive<Partial<AuthLoginReqDto>>({});

async function onSubmit(event: FormSubmitEvent<AuthLoginReqDto>) {
  await AuthApiService.login(event.data);
  emit("success");
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
</template>
