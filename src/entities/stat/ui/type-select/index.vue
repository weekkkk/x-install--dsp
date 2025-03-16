<script setup lang="ts">
import { typesConst } from "./consts";

const type = defineModel<keyof typeof typesConst>();

const onClick = (key: string) => {
  type.value = key as keyof typeof typesConst;
};

const user = useState<AuthResDto["user"] | undefined>("user");

const route = useRoute();

const { data } = await useAsyncData(
  "user",
  async () =>
    user.value?.role === "Admin" && route.query.user
      ? await UserApiService.getOne(Number(route.query.user))
      : null,
  {
    watch: [() => user.value?.role, () => route.query.user],
    immediate: true,
  }
);

const options = computed((): TUiButtonSelectOption[] => {
  const u = data.value || user.value;
  console.log(u);
  if (!u) return [];

  const arr: Partial<typeof typesConst> = {};

  if (u.isDsp) arr.dsp = typesConst.dsp;
  if (u.isDspInApp) arr["dsp--in-app"] = typesConst["dsp--in-app"];
  if (u.isDspBanner) arr["dsp--banner"] = typesConst["dsp--banner"];

  return Object.entries(arr).map(([key, { name: label }]) => ({ key, label }));
});
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
      v-for="{ key, label } in options"
      :key="key"
      class="w-40"
      v-bind="key === type ? {} : { color: 'white', variant: 'ghost' }"
      @click="onClick(key)"
    >
      {{ label }}
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
