export const DSP_STAT_API_URL
  = import.meta.env.PROD || import.meta.env.SSR
    ? "https://xinstallbotprofile.onrender.com/api"
    : "/server";

export const $dspStat = $fetch.create({
  baseURL: DSP_STAT_API_URL,
  credentials: "include",
  onRequest: ({ options }) => {
    options.headers.set(
      "Authorization",
      `Bearer ${useCookie("accessToken").value}`,
    );
  },
});
