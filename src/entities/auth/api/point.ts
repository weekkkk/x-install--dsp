export const AUTH_API_URL =
  process.env.NODE_ENV === "production"
    ? "https://xinstallbotprofile.onrender.com/api/Auth"
    : "/server/Auth";

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
