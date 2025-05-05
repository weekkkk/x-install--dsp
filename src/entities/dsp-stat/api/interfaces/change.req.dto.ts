import type { DspStatResDto } from "./res.dto";

export interface DspStatChangeReqDto {
  id: number;
  key: keyof DspStatResDto;
  value: number | string;
}
