export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useState("auth");
  const user = useState<AuthResDto["user"] | undefined>("user");
  if (auth.value === undefined || !user.value) return;

  if (!auth.value && to.path !== "/login") return navigateTo("/login");
  if (to.path === "/users" && user.value.role !== "Admin")
    return navigateTo({ path: "/" });
  if (to.path === "/" && user.value.role === "Admin" && !to.query.user)
    return navigateTo({
      path: "/users",
      query: {
        mode: "view"
      }
    });
});
