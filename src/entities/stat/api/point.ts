export const STAT_API_URL = "/api/admin/";

export const $stat = $fetch.create({
  baseURL: STAT_API_URL,
  credentials: "include",
  onRequest: ({ request, options }) => {
    options.headers.set(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );
  },
});
