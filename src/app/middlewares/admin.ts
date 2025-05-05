export default defineNuxtRouteMiddleware(async () => {
  const user = useAuthApiUser();

  if (user.value?.role === "Admin")
    return;

  return abortNavigation({ error: true, statusCode: 404 });
});
