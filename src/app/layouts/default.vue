<script setup lang="ts">
const route = useRoute();

const userId = computed(() => {
  const id = route.params.userId;
  if (!id)
    return;
  return Number(id);
});

function goToLogin() {
  navigateTo("/login");
}

const actions = computed((): LayoutHeaderWidgetProps["actions"] => {
  return route.meta.actions as LayoutHeaderWidgetProps["actions"];
});
const action = computed((): LayoutHeaderWidgetProps["action"] => {
  const _mode = route.params.mode as LayoutHeaderWidgetProps["action"];
  switch (_mode) {
    case "delete":
      return "delete";
    case "create":
      return "create";
    default:
      return undefined;
  }
});
const mdActions = computed((): LayoutHeaderWidgetProps["mdActions"] => {
  return route.meta.mdActions as LayoutHeaderWidgetProps["mdActions"];
});

const toggleValue = computed((): LayoutHeaderWidgetProps["toggleValue"] => {
  return !!route.meta.toggleValue;
});
const defaultMode = computed((): string | undefined => {
  return `${route.meta.defaultMode}`;
});

function onDeleteMode() {
  const mode = route.params.mode;
  if (mode === "delete")
    navigateTo({ params: { mode: defaultMode.value } });
  else
    navigateTo({ params: { mode: "delete" } });
}

async function onDelete() {
  const _onDelete = route.meta.onDelete as () => Promise<void>;
  await _onDelete();
}

function onToggle() {
  const _onToggle = route.meta.onToggle as () => void;
  _onToggle();
}
function onAdd() {
  const _onAdd = route.meta.onAdd as () => void;
  _onAdd();
}
function onCreate() {
  const _onCreate = route.meta.onCreate as () => void;
  _onCreate();
}
</script>

<template>
  <LayoutHeaderWidget
    :user-id="userId" :actions="actions" :action="action" :md-actions="mdActions" :toggle-value="toggleValue" @delete-mode="onDeleteMode"
    @delete="onDelete"
    @toggle="onToggle"
    @add="onAdd"
    @login="goToLogin()" @logout="goToLogin()"
    @create="onCreate"
  />
  <main class="px-2.5 max-md:px-0 grow">
    <NuxtPage />
  </main>
</template>
