<script setup lang="ts">
const user = useState<AuthResDto["user"] | undefined>("user");

const route = useRoute();

const auntificated = useState<boolean>("auth");
const isAdmin = computed(() => user.value && user.value.role === "Admin");
const nickname = computed(() => data.value && data.value.username);
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
</script>

<template>
  <div class="h-screen flex flex-col">
    <header class="px-20 py-14 flex flex-col max-md:px-8 max-md:py-8">
      <div class="flex justify-between items-center gap-8 max-md-gap-4">
        <div class="w-full flex items-center gap-[11.1rem] max-md:w-auto">
          <UIcon name="xi:logo" class="h-12 w-[4.2rem]" />
          <Transition>
            <div v-if="isStat && auntificated" class="flex gap-3 max-md:hidden">
              <StatDateRangeFilterWidget />
            </div>
          </Transition>
        </div>

        <Transition>
          <div v-if="isStat && auntificated" class="max-md:hidden">
            <StatTypeFilterWidget />
          </div>
        </Transition>

        <div v-if="!auntificated">
          <UButton class="w-[13.5rem] text-2xl h-24" color="gray">
            Log in
          </UButton>
        </div>

        <div v-else class="flex justify-end gap-8 w-full max-md:gap-4">
          <Transition>
            <div v-if="isUsers" class="flex gap-[inherit]">
              <UserSearchWidget />
              <UButton
                @click="toggleUsersMode"
                class="max-md:hidden"
                icon="xi:trash"
                :color="route.query.mode === 'del' ? 'primary' : 'gray'"
              />
              <UButton
                class="max-md:hidden"
                icon="xi:plus"
                @click="pushToCreateUser"
                color="gray"
              />
            </div>
          </Transition>

          <UButton
            v-if="isAdmin"
            class="max-md:hidden transition-all"
            :class="{ 'rotate-45': isUsers }"
            icon="xi:category"
            color="gray"
            @click="push"
          />

          <Transition name="w">
            <div
              v-if="isStat"
              class="flex gap-[inherit] -ml-8 w-[25.4rem] max-md:-ml-4 max-md:w-[8rem] justify-end"
            >
              <UButton
                v-if="isAdmin"
                color="gray"
                class="w-[13.4rem] max-md:hidden ml-8 whitespace-nowrap overflow-hidden"
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
                icon="xi:logout"
                color="gray"
                @click="
                  () => {
                    close();
                    logout();
                  }
                "
              />
            </template>
          </UPopover>
        </div>
      </div>

      <Transition name="h">
        <div v-if="isStat && auntificated" class="md:hidden h-36 flex flex-col">
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

    <div v-if="isAdmin" class="md:hidden flex gap-4 fixed bottom-8 left-8">
      <UButton
        class="transition-all duration-500"
        :class="{ 'rotate-45': isUsers }"
        icon="xi:category"
        @click="push"
      />

      <Transition>
        <div v-if="isUsers" class="flex gap-[inherit]">
          <UButton
            @click="toggleUsersMode"
            icon="xi:trash"
            :color="route.query.mode === 'del' ? 'gray' : 'primary'"
          />
          <UButton icon="xi:plus" @click="pushToCreateUser" />
        </div>
      </Transition>
    </div>

    <Transition>
      <UButton
        v-if="isAdmin && isStat"
        class="md:hidden w-48 fixed bottom-8 right-8"
      >
        {{ nickname }}
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
