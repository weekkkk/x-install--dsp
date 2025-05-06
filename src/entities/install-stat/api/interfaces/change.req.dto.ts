import type { InstallStatResDto } from "./res.dto";

export interface InstallStatChangeReqDto {
  id: number;
  key: keyof InstallStatResDto;
  value: InstallStatResDto[keyof InstallStatResDto];
}
