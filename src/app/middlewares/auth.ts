export default defineNuxtRouteMiddleware(async (to) => {
  const user = useAuthApiUser();

  if (!import.meta.env.SSR || user.value) {
    if (!user.value && to.path !== "/login")
      return navigateTo("/login");

    return;
  }

  const refreshToken = useCookie("refreshToken");

  if (to.path === "/login" && !refreshToken.value)
    return;

  if (!refreshToken.value)
    return navigateTo("/login");

  try {
    const event = useRequestEvent();

    if (!event)
      return;

    const data = await $fetch<ReturnType<typeof AuthApiService.checkAuth>>("https://xinstallbotprofile.onrender.com/api/Auth/refresh", {
      credentials: "include",
      onRequest: ({ options }) => {
        options.headers.set("Cookie", `refreshToken=${refreshToken.value}`);
      },
      onResponse: ({ response }) => {
        event.node.res.setHeader("set-cookie", response.headers.getSetCookie());
      },
    });

    user.value = data.user;

    if (to.path === "/login")
      return navigateTo("/panel");
  }
  catch (err) {
    user.value = undefined;
    refreshToken.value = undefined;
    console.error("[auth middleware] Не обновить токены", err);
    if (to.path !== "/login")
      return navigateTo("/login");
  }
});
