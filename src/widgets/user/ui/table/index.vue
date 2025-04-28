<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { UserTableWidgetProps } from "./interfaces";
import { format } from "date-fns";

const props = defineProps<UserTableWidgetProps>();

const UCheckbox = resolveComponent("UCheckbox");

const { data: users } = useAsyncData("user-list", () => UserApiService.getAll(), { default: () => [] });

const selectedUserIds = defineModel<UserResDto["id"][]>({ default: () => [] });

const rowSelection = computed<Record<string, boolean>>({
  get: () => {
    return selectedUserIds.value.reduce((acc, id) => ({ ...acc, [id.toString()]: true }), {});
  },
  set: (v) => {
    selectedUserIds.value = Object.entries(v).filter(([,v]) => v).map(([k]) => Number(k));
  },
});

const defaultColumns: TableColumn<UserResDto>[] = [
  {
    accessorKey: "createdAt",
    header: "date add",
    cell: ({ row }) => `${format(row.getValue<string>("createdAt"), "dd.MM.yy")}`,
  },
  {
    accessorKey: "id",
  },
  {
    accessorKey: "username",
    header: "nickname",
  },
  {
    accessorKey: "login",
  },
  {
    accessorKey: "password",
  },
  {
    header: "unlocked",
  },
];

const columns = computed(() => {
  switch (props.mode) {
    case "select":
      return [{
        id: "select",
        cell: ({ row }) =>
          h(UCheckbox, {
            "modelValue": row.getIsSelected(),
            "onUpdate:modelValue": (value: boolean | "indeterminate") => {
              const v = !!value;
              const key = row.id.toString();
              rowSelection.value = { [key]: v };
            },
            "aria-label": "Select row",
            "ui": { container: "h-6", base: "size-6 rounded-xl" },
            "class": "-m-0.75",
          }),
      }, ...defaultColumns];
    case "delete":
      return [{
        id: "select",
        cell: ({ row }) =>
          h(UCheckbox, {
            "color": "error",
            "modelValue": row.getIsSelected(),
            "onUpdate:modelValue": (value: boolean | "indeterminate") => row.toggleSelected(!!value),
            "aria-label": "Select row",
            "ui": { container: "h-6", base: "size-6 rounded-xl" },
            "class": "-m-0.75",
          }),
      }, ...defaultColumns];
    default:
      return defaultColumns;
  }
});

const nicknameLoadings = reactive<Record<number, boolean>>({});

function onBlur(e: FocusEvent, original: UserResDto) {
  const newValue = (e.target as HTMLInputElement).value;
  if (original.username === newValue)
    return;
  changeNickname(original, newValue);
}

async function changeNickname(original: UserResDto, name: string) {
  const id = original.id;
  const oName = original.username;
  try {
    original.username = name;
    nicknameLoadings[id] = true;
    await UserApiService.changeName({ id, name });
  }
  catch {
    original.username = oName;
  }
  finally {
    nicknameLoadings[id] = false;
  }
}
</script>

<template>
  <UTable
    v-model:row-selection="rowSelection"
    :get-row-id="(row) => row.id.toString()"
    :ui="{ base: 'max-md:mx-5', th: 'not-[:first-child]:text-right whitespace-nowrap', td: 'not-[:first-child]:text-right' }" :data="users" :columns="columns"
  >
    <template #username-cell="{ row: { original } }">
      <UInput
        :model-value="original.username" :ui="{ base: 'text-right text-base-sm font-medium p-3 rounded-none', root: '-m-3' }"
        variant="ghost"
        :loading="nicknameLoadings[original.id]"
        @blur="onBlur($event, original)"
      />
    </template>
    <template #unlocked-cell="{ row: { original } }">
      <div class="flex justify-end">
        <UserPanelEditorFeature
          :id="original.id"
          :default-values="{
            isXInstallApp: original.isXInstallApp,
            isDsp: original.isDsp,
            isDspInApp: original.isDspInApp,
            isDspBanner: original.isDspBanner,
          }"
        />
      </div>
    </template>
  </UTable>
</template>
