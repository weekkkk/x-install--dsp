<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import { format } from "date-fns";

const { data: users } = useAsyncData("users", () => UserApiService.getAll(), { default: () => [] });

const columns: TableColumn<UserResDto>[] = [
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
</script>

<template>
  <UTable :ui="{ th: 'not-[:first-child]:text-right', td: 'not-[:first-child]:text-right' }" :data="users" :columns="columns">
    <template #username-cell="{ row: { original } }">
      <UInput :ui="{ base: 'text-right text-base-sm font-medium p-3 rounded-none', root: '-m-3' }" variant="ghost" :model-value="original.username" />
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
