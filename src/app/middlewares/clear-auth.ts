export default defineNuxtRouteMiddleware(async () => {
  const user = useAuthApiUser();

  if (user.value)
    user.value = undefined;
});
