import { $user } from "./point";
import type {
  UserChangeFlagsReqDto,
  UserChangeNameReqDto,
  UserCreateReqDto,
  UserResDto,
  UserGenerateResDto,
} from "./types";

export class UserApiService {
  static async getAll() {
    const data = await $user<{ userResponse: UserResDto[] }>("/users");
    return data.userResponse.toSorted(({ id: a }, { id: b }) => a - b);
  }
  static async changeName({ id, name }: UserChangeNameReqDto) {
    await $user(`/user/${id}/username`, {
      method: "PUT",
      body: {
        id,
        username: name,
      },
    });
  }
  static async changeFlags({ id, ...rest }: UserChangeFlagsReqDto) {
    await $user(`/user/${id}/flags`, {
      method: "PUT",
      body: {
        id,
        ...rest,
      },
    });
  }
  static async deleteByIds(ids: number[]) {
    await $user(`/deleteUsers`, {
      method: "DELETE",
      body: ids,
    });
  }
  static generateData() {
    return $user<UserGenerateResDto>("/generateUserData");
  }
  static async create(body: UserCreateReqDto) {
    await $user("/saveUserData", {
      method: "POST",
      body,
    });
  }
}
