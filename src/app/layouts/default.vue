<script setup lang="ts">
const user = useState<AuthResDto["user"] | undefined>("user");

const route = useRoute();

const auntificated = useState<boolean>("auth");
const isAdmin = computed(() => user.value && user.value.role === "Admin");
const nickname = computed(
  () => (data.value && data.value.username) || "username"
);
const id = computed(() => user.value?.id);
const name = computed(() => user.value?.login.slice(0, 1));

const { data } = await useAsyncData(
  "user",
  async () =>
    isAdmin.value && route.query.user
      ? await UserApiService.getOne(Number(route.query.user))
      : null,
  {
    watch: [isAdmin, () => route.query.user],
  }
);

const isStat = computed(() => route.path === "/");
const isUsers = computed(() => route.path === "/users");

const push = async () => {
  console.log("push");
  if (isStat.value) {
    await pushUsersToViewMode();
  } else
    await navigateTo({
      path: "/",
      query: {
        user: route.query.user,
      },
    });
};

const toggleMode = () => {
  if (isUsers.value) toggleUsersMode();
  else {
    navigateTo({
      path: "/",
      query: {
        ...route.query,
        mode: route.query.mode === "del" ? "view" : "del",
      },
    });
  }
};

const toggleUsersMode = () => {
  route.query.mode === "del" ? pushUsersToViewMode() : pushUsersToDelMode();
};

const pushUsersToViewMode = async () => {
  const query: TUsersPageQuery = { mode: "view" };
  await navigateTo({
    path: "/users",
    query: { user: route.query.user, ...query },
  });
};
const pushUsersToDelMode = async () => {
  const query: TUsersPageQuery = { mode: "del" };
  await navigateTo({
    path: "/users",
    query: { user: route.query.user, ...query },
  });
};

const pushToCreateUser = async () => {
  await navigateTo({ path: "/create-user" });
};

const logout = async () => {
  await AuthApiService.logout();
  await navigateTo({ path: "/login" });
};

const exportStat = async ({ key }: any) => {
  if (
    !user.value ||
    !route.query.start ||
    !route.query.end ||
    !route.query.panel
  )
    return;
  const blob = await StatApiService[
    key === "excel" ? "exportExcel" : "exportPdf"
  ]({
    UserId:
      user.value.role === "Admin" ? Number(route.query.user) : user.value.id,
    IsDsp: route.query.panel === "dsp",
    IsDspInApp: route.query.panel === "dsp--in-app",
    IsDspBanner: route.query.panel === "dsp--banner",
    StartDate: route.query.start.toString(),
    EndDate: route.query.end.toString(),
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = key === "excel" ? "Excel.xlsx" : "PDF.pdf"; // Укажи нужное имя файла
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href); // Освобождаем память
};
</script>

<template>
  <div class="h-screen flex flex-col">
    <header class="px-20 py-14 flex flex-col max-md:px-8 max-md:py-8">
      <div class="flex justify-between items-center gap-8 max-md-gap-4">
        <div class="w-full flex items-center gap-[11.1rem] max-md:w-auto">
          <UIcon name="xi:logo" class="h-12 w-[4.2rem]" />
          <Transition>
            <div
              v-show="isStat && auntificated === true"
              class="flex gap-3 max-md:hidden"
            >
              <StatDateRangeFilterWidget />
            </div>
          </Transition>
        </div>

        <Transition>
          <div v-show="isStat && auntificated" class="max-md:hidden">
            <StatTypeFilterWidget />
          </div>
        </Transition>

        <div v-show="!auntificated">
          <UButton class="w-[13.5rem] text-2xl h-24" color="gray">
            Log in
          </UButton>
        </div>

        <div
          v-show="auntificated"
          class="flex justify-end gap-8 w-full max-md:gap-4"
        >
          <UButton
            v-show="isAdmin"
            @click="toggleMode"
            class="max-md:hidden"
            icon="xi:trash"
            :color="route.query.mode === 'del' ? 'primary' : 'gray'"
          />
          <Transition>
            <div v-show="isUsers" class="flex gap-[inherit]">
              <UserSearchWidget />

              <UButton
                class="max-md:hidden"
                icon="xi:plus"
                @click="pushToCreateUser"
                color="gray"
              />
            </div>
          </Transition>

          <UButton
            v-show="isAdmin"
            class="max-md:hidden transition-all"
            :class="{ 'rotate-45': isUsers }"
            icon="xi:category"
            color="gray"
            @click="push"
          />

          <Transition name="w">
            <div
              v-show="isStat"
              class="flex gap-[inherit] -ml-8 w-[35.2rem] max-md:-ml-4 max-md:w-[8rem] justify-end"
            >
              <UiButtonSelect
                :model-value="{ key: 'export', label: 'Export' }"
                @update:model-value="exportStat"
                :options="[
                  { key: 'export', label: 'Export' },
                  { key: 'excel', label: 'Excel' },
                  { key: 'pdf', label: 'PDF' },
                ]"
                class="ml-8"
                selected-color="primary"
              />
              <UButton
                v-show="isAdmin"
                color="gray"
                class="w-[13.4rem] max-md:hidden whitespace-nowrap overflow-hidden"
              >
                <span class="w-full overflow-hidden text-ellipsis">
                  {{ nickname }}
                </span>
              </UButton>
              <UButton color="gray" class="w-32"> Id: {{ id }} </UButton>
            </div>
          </Transition>

          <UPopover
            :ui="{
              background: 'dark:bg-transparent',
              ring: 'ring-0',
              rounded: 'rounded-full',
            }"
          >
            <UAvatar :alt="name" />

            <template #panel="{ close }">
              <UButton
                color="gray"
                @click="
                  () => {
                    close();
                    logout();
                  }
                "
                class="w-24 h-24 max-md:w-20 max-md:h-20"
              >
                <template #leading>
                  <NuxtImg
                    class="w-[2.4rem] h-[2.4rem] max-md:w-[1.6rem] max-md:h-[1.6rem]"
                    src="/icons/logout.svg"
                  />
                </template>
              </UButton>
            </template>
          </UPopover>
        </div>
      </div>
      <NuxtImg
        v-show="false"
        class="w-[2.4rem] h-[2.4rem] max-md:w-[1.6rem] max-md:h-[1.6rem]"
        src="/icons/logout.svg"
      />

      <Transition name="h">
        <div
          v-show="isStat && auntificated === true"
          class="md:hidden h-36 flex flex-col"
        >
          <div class="flex gap-4 justify-between mt-16">
            <div class="flex gap-4">
              <StatDateRangeFilterWidget />
            </div>

            <StatTypeFilterWidget />
          </div>
        </div>
      </Transition>
    </header>

    <main class="px-4 max-md:px-0 grow flex flex-col">
      <NuxtPage />
    </main>

    <div v-show="isAdmin" class="md:hidden flex gap-4 fixed bottom-8 left-8">
      <UButton
        class="transition-all duration-500"
        :class="{ 'rotate-45': isUsers }"
        icon="xi:category"
        @click="push"
      />

      <div class="flex gap-[inherit]">
        <UButton
          @click="toggleUsersMode"
          icon="xi:trash"
          :color="route.query.mode === 'del' ? 'gray' : 'primary'"
        />
        <UButton icon="xi:plus" @click="pushToCreateUser" />
      </div>
    </div>

    <Transition>
      <UButton
        v-show="isAdmin && isStat"
        class="md:hidden w-48 fixed bottom-8 right-8 whitespace-nowrap"
      >
        <span class="w-full overflow-hidden text-ellipsis">
          {{ nickname }}
        </span>
      </UButton>
    </Transition>
  </div>
</template>

<style scoped>
.h-enter-active,
.h-leave-active {
  transition: all 0.5s ease;
}

.h-enter-from,
.h-leave-to {
  opacity: 0;
  scale: 0;
  height: 0;
}
.w-enter-active,
.w-leave-active {
  transition: all 0.5s ease;
}

.w-enter-from,
.w-leave-to {
  opacity: 0;
  scale: 0;
  width: 0;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  scale: 0;
}
</style>
