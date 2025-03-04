export const AUTH_API_URL =
  "https://xinstallbotprofile-production.up.railway.app/api/Auth";

export const $auth = $fetch.create({
  baseURL: AUTH_API_URL,
  credentials: "include",
  onRequest: ({ request, options }) => {
    options.headers.set(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );
  },
});
