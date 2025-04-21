export default defineNuxtRouteMiddleware(async () => {
  const user = useState("user");

  if (user.value)
    return;

  try {
    const event = useRequestEvent();

    const data = await $fetch("https://xinstallbotprofile.onrender.com/api/Auth/refresh", {
      credentials: "include",
      onRequest: ({ options }) => {
        options.headers.set("Cookie", `refreshToken=${useCookie("refreshToken").value}`);
      },
      onResponse: ({ response }) => {
        event.node.res.setHeader("set-cookie", response.headers.getSetCookie());
      },
    });

    user.value = data.user;
  }
  catch (err) {
    console.log(err);

    console.error("[auth middleware] Не удалось получить пользователя", err);
    // Возможно токен протух — чистим и редиректим
    // token.value = "";
    return navigateTo("/login");
  }
});
