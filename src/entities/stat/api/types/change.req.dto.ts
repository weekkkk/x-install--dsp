import type { StatResDto } from "./res.dto";

export type StatChangeReqDto = {
  id: number;
  key: keyof StatResDto;
  value: number;
};
