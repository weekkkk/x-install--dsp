import type { UserResDto } from "./res.dto";

export type UserChangeFlagsReqDto = {
  id: UserResDto["id"];
  isDsp: boolean;
  isDspInApp: boolean;
  isDspBanner: boolean;
};
