<script setup lang="ts">
import { userCreateFormDataSchema, type TUserCreateFormData } from "./schemes";

const state = reactive<TUserCreateFormData>({
  id: 0,
  login: "",
  password: "",
  name: "",
});
const form = ref<Form<TUserCreateFormData>>();

const emit = defineEmits<{
  submit: [data: TUserCreateFormData];
}>();

const onSubmit = () => {
  emit("submit", state);
};
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
      <UInput
        v-model="state.id"
        type="number"
        placeholder="Generate id"
        size="lg"
      />
    </UFormGroup>
    <UFormGroup name="login">
      <UInput v-model="state.login" placeholder="Generate login" size="lg" />
    </UFormGroup>
    <UFormGroup name="password">
      <UInput v-model="state.password" placeholder="Input password" size="lg" />
    </UFormGroup>
    <UFormGroup name="name">
      <UInput v-model="state.name" placeholder="Input name" size="lg" />
    </UFormGroup>

    <div class="flex w-full overflow-hidden gap-4 !mt-8">
      <UButton class="w-full shrink" color="gray" size="lg">
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
