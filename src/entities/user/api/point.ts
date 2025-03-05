export const AUTH_API_URL = "/api/admin/";

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
