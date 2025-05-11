export const AUTH_API_URL
  = import.meta.env.PROD || import.meta.env.SSR
    ? "/proxy-api/Auth"
    : "/server/Auth";

export const $auth = $fetch.create({
  baseURL: AUTH_API_URL,
  credentials: "include",
  onRequest: ({ options }) => {
    options.headers.set(
      "Authorization",
      `Bearer ${useCookie("accessToken").value}`,
    );
  },
});
