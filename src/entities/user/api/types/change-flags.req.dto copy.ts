import type { UserResDto } from "./res.dto";

export type UserChangeFlagsReqDto = {
  id: UserResDto["id"];
  flag1: boolean;
  flag2: boolean;
  flag3: boolean;
};
