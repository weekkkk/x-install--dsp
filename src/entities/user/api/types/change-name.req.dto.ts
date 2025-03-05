import type { UserResDto } from "./res.dto";

export type UserChangeNameReqDto = {
  id: UserResDto["id"];
  name: string;
};
