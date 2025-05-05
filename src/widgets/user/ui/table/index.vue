<script setup lang="ts">
import type { UserTableWidgetProps } from "./interfaces";
import { format } from "date-fns";

const props = defineProps<UserTableWidgetProps>();

const { data: users, status } = useAsyncData("user-list", () => UserApiService.getAll(), { default: () => [] });

const selectedUserIds = defineModel<UserResDto["id"][]>({ default: () => [] });

const columns: EditableTableColumn<UserResDto>[] = [
  {
    accessorKey: "createdAt",
    header: "date add",
    cell: ({ row }) => `${format(row.getValue<string>("createdAt"), "dd.MM.yy")}`,
    type: "date",
  },
  {
    accessorKey: "id",
  },
  {
    accessorKey: "username",
    header: "nickname",
    type: "string",
    editable: true,
  },
  {
    accessorKey: "login",
  },
  {
    accessorKey: "password",
  },
];

async function changeNickname(id: number, name: string) {
  await UserApiService.changeName({ id, name });
}

const _users = computed(() => {
  const _search = props.search;
  if (!_search)
    return users.value;
  return users.value.filter(({ username }) => username?.toLowerCase().includes(_search));
});
</script>

<template>
  <UiEditableTable
    v-model="selectedUserIds"
    :columns="columns"
    :loading="status === 'pending'"
    :rows="_users"
    :custom-columns="[{
      accessorKey: 'unlocked',
    }]"
    :mode="mode"
    @change="(id, key, value) => {
      if (key !== 'username') return
      changeNickname(id, value as string)
    }"
  >
    <template #unlocked-cell="{ row: { original } }">
      <div class="flex justify-end">
        <UserPanelEditorFeature
          :id="original.id"
          v-model:install="original.isXInstallApp"
          v-model:dsp="original.isDsp"
          v-model:dsp-in-app="original.isDspInApp"
          v-model:dsp-banner="original.isDspBanner"
        />
      </div>
    </template>
  </UiEditableTable>
</template>
