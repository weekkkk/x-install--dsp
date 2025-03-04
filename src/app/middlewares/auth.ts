export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path === "/login") return;
  try {
    await AuthApiService.checkAuth();
    console.log("auth");
  } catch (e) {
    console.log(e);

    console.log("test");

    // return navigateTo("/login");
  }
});
