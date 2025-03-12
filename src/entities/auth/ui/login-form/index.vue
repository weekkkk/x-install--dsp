<script setup lang="ts">
import { authLoginFormDataSchema, type TAuthLoginFormData } from "./schemes";
import type { TAuthLoginForomProps } from "./types";
import type { Form } from "#ui/types";

const props = defineProps<TAuthLoginForomProps>();

const state = reactive<TAuthLoginFormData>({ login: "", password: "" });
const form = ref<Form<TAuthLoginFormData>>();

const emit = defineEmits<{
  submit: [data: TAuthLoginFormData];
  blur: [key: keyof TAuthLoginFormData];
}>();
</script>

<template>
  <UForm
    ref="form"
    :schema="authLoginFormDataSchema"
    class="space-y-4"
    :state="state"
    @submit="emit('submit', state)"
  >
    <div v-if="error" class="text-danger text-xl ml-8 font-medium">
      {{ error.login || error.password }}
    </div>
    <UFormGroup name="login" :error="!!error?.login || undefined">
      <UInput
        v-model="state.login"
        placeholder="Login"
        size="lg"
        @blur="emit('blur', 'login')"
      />
    </UFormGroup>
    <UFormGroup name="password" :error="!!error?.password || undefined">
      <UInput
        v-model="state.password"
        placeholder="Password"
        size="lg"
        @blur="emit('blur', 'password')"
      />
    </UFormGroup>

    <UButton class="w-full shrink !mt-8" type="submit" size="lg">
      Continue
    </UButton>
  </UForm>
</template>
