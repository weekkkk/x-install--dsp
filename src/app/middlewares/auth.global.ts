export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useState("auth");
  if (auth.value === undefined) return;

  if (!auth.value && to.path !== "/login") return navigateTo("/login");
});
