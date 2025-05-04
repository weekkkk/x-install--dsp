export default defineNuxtRouteMiddleware(async () => {
  const user = useAuthApiUser();

  if (!user.value)
    return;

  let panel: UserPanel | undefined;
  switch (user.value.role) {
    case "User":
      if (user.value.isXInstallApp)
        panel = "install";
      else if (user.value.isDsp)
        panel = "dsp";
      else if (user.value.isDspInApp)
        panel = "dsp-in-app";
      else if (user.value.isDspBanner)
        panel = "dsp-banner";
      if (!panel)
        return;
      return navigateTo(`panel-${panel}`);
    case "Admin":
      return navigateTo(`user-list/select`);
  }
});
