import { $auth, AUTH_API_URL } from "./point";
import type { AuthLoginReqDto, AuthResDto } from "./types";
export class AuthApiService {
  static async login(body: AuthLoginReqDto) {
    const data = await $auth<AuthResDto>("/login", {
      method: "POST",
      body,
    });
    localStorage.setItem("token", data.accessToken);

    return data;
  }

  static async checkAuth() {
    const data = await $fetch<AuthResDto>(`${AUTH_API_URL}/refresh`);
    localStorage.setItem("token", data.accessToken);

    return data;
  }
}
