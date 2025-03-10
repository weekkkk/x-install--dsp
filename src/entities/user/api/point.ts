export const AUTH_API_URL =
  process.env.NODE_ENV === "production"
    ? "https://xinstallbotprofile-production.up.railway.app/api/admin"
    : "/server/admin";

export const $user = $fetch.create({
  baseURL: AUTH_API_URL,
  credentials: "include",
  onRequest: ({ request, options }) => {
    options.headers.set(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );
  },
});
