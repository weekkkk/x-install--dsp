import type { UserResDto } from "./res.dto";

export type UserCreateReqDto = {
  userId: number;
  username: string;
  login: string;
  password: string;
};
