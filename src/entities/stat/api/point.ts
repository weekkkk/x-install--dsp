export const STAT_API_URL =
  process.env.NODE_ENV === "production"
    ? "https://xinstallbotprofile.onrender.com/api"
    : "/server";

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
