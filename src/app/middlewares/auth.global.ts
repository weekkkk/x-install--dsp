import { useAuthApiUser } from "#imports";

export default defineNuxtRouteMiddleware(async (to) => {
  const user = useAuthApiUser();
  console.log(user.value);

  // const accessToken = useCookie("accessToken");

  if (to.path === "/login" && user.value === null) {
    console.log("login");

    return;
  }
  if (user.value || user.value === null)
    return;

  try {
    console.log("import.meta.env.SSR", import.meta.env.SSR);

    if (import.meta.env.SSR) {
      const event = useRequestEvent();
      if (!event)
        return;

      const data = await $fetch<ReturnType<typeof AuthApiService.checkAuth>>("https://xinstallbotprofile.onrender.com/api/Auth/refresh", {
        credentials: "include",
        onRequest: ({ options }) => {
          console.log("useCookie(\"refreshToken\").value", useCookie("refreshToken").value);
          options.headers.set("Cookie", `refreshToken=${useCookie("refreshToken").value}`);
        },
        onResponse: ({ response }) => {
          event.node.res.setHeader("set-cookie", response.headers.getSetCookie());
        },
      });

      user.value = data.user;
    }
    else {
      const data = await AuthApiService.checkAuth();
      user.value = data.user;
    }
    if (to.path === "/login")
      return navigateTo("/");
  }
  catch (err) {
    user.value = null;
    console.error("[auth middleware] Не обновить токены", err);

    // return navigateTo("/login");
  }
});
