<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import type { UserCreateWidgetEmits } from "./interfaces";

const emit = defineEmits<UserCreateWidgetEmits>();

const state = reactive<Partial<UserCreateReqDto>>({});

const $form = useTemplateRef("form");

async function generate() {
  const data = await UserApiService.generateData();
  state.login = data.login;
  state.userId = data.id;
  state.username = data.nickname;
  state.password = data.password;
  $form.value?.validate?.();
}

async function onSubmit(event: FormSubmitEvent<UserCreateReqDto>) {
  await UserApiService.create(event.data);
  emit("success");
}
</script>

<template>
  <UForm ref="form" loading-auto :schema="userCreateReqDtoScheme" :state="state" class="space-y-2.5" @submit="onSubmit">
    <UFormField name="userId">
      <UInput v-model="state.userId" disabled placeholder="Id" />
    </UFormField>

    <UFormField name="login">
      <UInput v-model="state.login" disabled placeholder="Login" />
    </UFormField>

    <UFormField name="username">
      <UInput v-model="state.username" placeholder="Nickname" />
    </UFormField>

    <UFormField name="password">
      <UInput v-model="state.password" placeholder="Password" type="password" />
    </UFormField>

    <div class="flex justify-between gap-2.5">
      <UButton loading-auto class="w-full mt-2.5" color="neutral" @click="generate">
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-(--ui-secondary) to-(--ui-primary)">
          Generate
        </span>
      </UButton>
      <UButton loading-auto type="submit" class="w-full mt-2.5">
        Save
      </UButton>
    </div>
  </UForm>
</template>
