<script
  setup
  lang="ts"
  generic="T extends {
  [key: string]: any;
}"
>
import type { TUiTableProps } from "./types";
import IMask from "imask";

const props = withDefaults(defineProps<TUiTableProps<T>>(), {
  customizeCols: [] as any,
  editableCols: [] as any,
  readonlyRows: [] as any,
  procentCols: [] as any,
  type: "text",
});
onMounted(() => {
  {
    if (props.type === "text") return;

    const els = document.querySelectorAll(".ui_table input");

    els.forEach((el) => {
      IMask(el as HTMLInputElement, { mask: Number, thousandsSeparator: " " });
    });
  }
});

onUpdated(() => {
  {
    if (props.type === "text") return;

    const els = document.querySelectorAll(".ui_table input");

    els.forEach((el) => {
      IMask(el as HTMLInputElement, { mask: Number, thousandsSeparator: " " });
    });
  }
});

const _columns = computed(() =>
  props.columns.map(({ key, label }) => ({
    key: key.toString(),
    label: label || key,
  }))
);

const mapedColumns = computed(() => {
  const add = [];
  if (props.isRadio) add.push({ key: "radio" });

  if (props.isCheckbox) add.push({ key: "checkbox" });
  return [...add, ..._columns.value];
});

const radioSelected = defineModel<string | number | undefined>("radio");
const multiSelected = defineModel<(string | number)[] | undefined>("checkbox");

const emit = defineEmits<{
  change: [{ row: T; key: keyof T; value: string }];
}>();

const oldValue = ref("");
const onFocus = ({ currentTarget }: FocusEvent) => {
  if (!currentTarget) return;
  oldValue.value = (currentTarget as HTMLInputElement).value;
};
const onBlur = ({ currentTarget }: FocusEvent, row: T, key: keyof T) => {
  if (!currentTarget) return;
  const value = (currentTarget as HTMLInputElement).value;
  if (oldValue.value === value) return;
  emit("change", {
    row,
    key,
    value,
  });
};
</script>

<template>
  <UTable
    class="ui_table min-w-fit"
    by="id"
    :columns="mapedColumns"
    :rows="rows"
    :loading="loading"
    :ui="customUi"
  >
    <template #radio-data="{ row }">
      <URadio
        class="h-[1.2rem]"
        name="radio"
        v-model="radioSelected"
        :value="row[by]"
      />
    </template>
    <template #checkbox-data="{ row }">
      <UCheckbox
        class="h-[1.2rem]"
        :ui="{
          base: 'h-[2.4rem] w-[2.4rem] dark:checked:bg-gradient-to-r from-[#F21919] to-[#B50000]',
          rounded: 'rounded-2xl',
        }"
        name="radio"
        :value="row[by]"
        v-model="multiSelected"
      />
    </template>

    <template
      v-for="key in editableCols"
      :key="key"
      v-slot:[`${key.toString()}-data`]="{ row }"
    >
      <div class="flex gap-2 items-center w-full min-w-24" :class="{'opacity-0': hideEmpty && !(row[key] || row[key] === 0)}">
        <UInput
          :key="`${row.id}-${key.toString()}`"
          :ui="{ padding: { sm: 'p-0 h-[4.2rem] leading-8' } }"
          class="-my-6 flex-grow"
          :model-value="row[key]"
          variant="none"
          @focus="onFocus"
          @blur="onBlur($event, row, key)"
          :readonly="readonly || readonlyRows?.includes(row[by])"
          :placeholder="
            key
              .toString()
              .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
              .toLowerCase()
          "
        />
        <span
          v-show="procentCols.includes(key)"
          class="font-semibold"
        >
          %
        </span>
      </div>
    </template>

    <template
      v-for="key in customizeCols"
      :key="key"
      v-slot:[`${key.toString()}-data`]="{ row }"
    >
      <slot :name="`${key.toString()}-data`" :row="row" />
    </template>
    <template
      v-for="key in customizeCols"
      :key="key"
      v-slot:[`${key.toString()}-header`]="{ row }"
    >
      <slot :name="`${key.toString()}-header`" :row="row" />
    </template>
  </UTable>
</template>
