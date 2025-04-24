import type {
  UserChangeFlagsReqDto,
  UserChangeNameReqDto,
  UserCreateReqDto,
  UserGenerateResDto,
  UserResDto,
} from "./interfaces";
import { $user } from "./point";

export class UserApiService {
  static async getOne(id: number) {
    const data = await $user<UserResDto & { userId: number }>(`/user/${id}`, {
      params: { userId: id },
    });
    return { ...data, id: data.userId };
  }

  static async getAll() {
    const data = await $user<{ userResponse: UserResDto[] }>("/users");
    console.log(data);

    return data.userResponse.toSorted(({ id: a }, { id: b }) => b - a);
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
