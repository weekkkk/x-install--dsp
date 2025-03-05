import { $user } from "./point";
import type {
  UserChangeFlagsReqDto,
  UserChangeNameReqDto,
  UserCreateReqDto,
  UserResDto,
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
  static async deleteOne(id: number) {
    await $user(`/user/${id}`, {
      method: "DELETE",
    });
  }
  static async create(body: UserCreateReqDto) {
    await $user("/user", {
      method: "POST",
      body,
    });
  }
}
