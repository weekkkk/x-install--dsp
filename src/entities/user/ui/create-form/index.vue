<script setup lang="ts">
import { userCreateFormDataSchema, type TUserCreateFormData } from "./schemes";
import type { TUserCreateFormProps } from "./types";

const props = defineProps<TUserCreateFormProps>();

const state = reactive<TUserCreateFormData>({
  id: "",
  login: "",
  password: "",
  name: "",
});

const emit = defineEmits<{
  generate: [];
  submit: [data: TUserCreateFormData];
}>();

const onSubmit = () => {
  emit("submit", state);
};

watch(
  () => props.defaultState,
  () => {
    state.id = props.defaultState?.id || "";
    state.login = props.defaultState?.login || "";
    state.password = props.defaultState?.password || "";
    state.name = props.defaultState?.name || "";
  }
);
</script>

<template>
  <UForm
    :schema="userCreateFormDataSchema"
    class="space-y-4"
    :state="state"
    :validateOn="['submit']"
    @submit="onSubmit"
  >
    <UFormGroup name="id">
      <UInput v-model="state.id" placeholder="Generate id" size="lg" readonly />
    </UFormGroup>
    <UFormGroup name="login">
      <UInput
        v-model="state.login"
        placeholder="Generate login"
        size="lg"
        readonly
      />
    </UFormGroup>
    <UFormGroup name="password">
      <UInput v-model="state.password" placeholder="Input password" size="lg" />
    </UFormGroup>
    <UFormGroup name="name">
      <UInput v-model="state.name" placeholder="Input name" size="lg" />
    </UFormGroup>

    <div class="flex w-full overflow-hidden gap-4 !mt-8">
      <UButton
        class="w-full shrink"
        color="gray"
        size="lg"
        @click="emit('generate')"
      >
        <span
          class="bg-clip-text text-transparent dark:bg-gradient-to-r dark:from-brand-from dark:to-brand-to"
        >
          Generate
        </span>
      </UButton>
      <UButton class="w-full shrink" type="submit" size="lg"> Save </UButton>
    </div>
  </UForm>
</template>
