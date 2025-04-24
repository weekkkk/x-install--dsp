export default defineNuxtRouteMiddleware(async () => {
  const user = useAuthApiUser();
  const refreshToken = useCookie("refreshToken");
  const accessToken = useCookie("accessToken");

  user.value = undefined;
  refreshToken.value = undefined;
  accessToken.value = undefined;
});
