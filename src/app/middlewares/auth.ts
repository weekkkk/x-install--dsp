export default defineNuxtRouteMiddleware(async (to) => {
  console.log("test middleware");

  const auth = useState("auth");

  if (!auth.value) {
    return navigateTo("/login");
  }

  if (to.path !== "/") {
    return navigateTo("/");
  }
});
