export default defineNuxtRouteMiddleware(async () => {
  const user = useAuthApiUser();

  if (user.value?.role === "User")
    return;

  return abortNavigation({ error: true, statusCode: 404 });
});
