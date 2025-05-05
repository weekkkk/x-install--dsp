import type { AuthResDto } from "./interfaces";
import type { AuthLoginReqDto } from "./schemes";
import { useAuthApiUser } from "./composables";
import { $auth, AUTH_API_URL } from "./point";

export class AuthApiService {
  static async login(body: AuthLoginReqDto) {
    const data = await $auth<AuthResDto>("/login", {
      method: "POST",
      body,
    });
    const accessToken = useCookie("accessToken");
    accessToken.value = data.accessToken;

    const user = useAuthApiUser();
    user.value = data.user;

    return data;
  }

  static async checkAuth() {
    const data = await $fetch<AuthResDto>(`${AUTH_API_URL}/refresh`, {
      method: "GET",
      credentials: "include",
    });

    const accessToken = useCookie("accessToken");
    accessToken.value = data.accessToken;

    return data;
  }

  static async logout() {
    await $fetch(`${AUTH_API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    const accessToken = useCookie("accessToken");
    accessToken.value = undefined;
  }
}
