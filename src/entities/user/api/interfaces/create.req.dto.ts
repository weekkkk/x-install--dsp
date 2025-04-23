import type { UserResDto } from "./res.dto";

export interface UserCreateReqDto {
  userId: number;
  username: string;
  login: string;
  password: string;
}
