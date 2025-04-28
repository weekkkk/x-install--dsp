import type { UserResDto } from "./res.dto";

export interface UserChangeFlagsReqDto {
  id: UserResDto["id"];
  isDsp: boolean;
  isDspInApp: boolean;
  isDspBanner: boolean;
  isXInstallApp: boolean;
}
