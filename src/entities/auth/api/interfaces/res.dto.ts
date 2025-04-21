import type { AuthResUserDto } from "./res.user.dto";

export interface AuthResDto {
  accessToken: string;
  user: AuthResUserDto;
}
