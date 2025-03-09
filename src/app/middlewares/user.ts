export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.query.user) return navigateTo("/users");
  return true;
});
