export default defineNuxtRouteMiddleware(async () => {
  const event = useRequestEvent();
  const user = useAuthApiUser();

  if (user.value || event?._path?.includes("/__nuxt_error"))
    return;

  const refreshToken = useCookie("refreshToken");
  const accessToken = useCookie("accessToken");

  try {
    if (import.meta.server) {
      if (!refreshToken.value)
        throw new Error("Нет токена");

      if (!event)
        return;

      const data = await $fetch<ReturnType<typeof AuthApiService.checkAuth>>("https://api.x-instals.com/api/Auth/refresh", {
        onRequest: ({ options }) => {
          options.headers.set("Cookie", `refreshToken=${refreshToken.value}`);
        },
        onResponse: ({ response }) => {
          event.node.res.setHeader("set-cookie", response.headers.getSetCookie());
        },
      });

      user.value = data.user;
      accessToken.value = data.accessToken;
    }
    else {
      const data = await AuthApiService.checkAuth();

      user.value = data.user;
      accessToken.value = data.accessToken;
    }
    console.log(user.value);
  }
  catch (err) {
    user.value = undefined;
    refreshToken.value = undefined;
    accessToken.value = undefined;
    console.error("[auth middleware] Не обновить токены", err);
  }
});
