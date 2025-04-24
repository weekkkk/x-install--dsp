export const USER_API_URL
  = import.meta.env.PROD || import.meta.env.SSR
    ? "https://xinstallbotprofile.onrender.com/api/admin"
    : "/server/admin";

export const $user = $fetch.create({
  baseURL: USER_API_URL,
  credentials: "include",
  onRequest: ({ options }) => {
    options.headers.set(
      "Authorization",
      `Bearer ${useCookie("accessToken").value}`,
    );
  },
});
