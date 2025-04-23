import type { UserResDto } from "./res.dto";

export interface UserChangeNameReqDto {
  id: UserResDto["id"];
  name: string;
}
