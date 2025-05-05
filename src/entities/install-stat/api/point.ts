export const INSTALL_STAT_API_URL
  = import.meta.env.PROD || import.meta.env.SSR
    ? "https://api.x-instals.com/api"
    : "/server";

export const $installStat = $fetch.create({
  baseURL: INSTALL_STAT_API_URL,
  credentials: "include",
  onRequest: ({ options }) => {
    options.headers.set(
      "Authorization",
      `Bearer ${useCookie("accessToken").value}`,
    );
  },
});
