import type { DspStatResDto } from "./res.dto";

export interface DspStatGetAllResDto {
  total: Pick<
    DspStatResDto,
    "total" | "ack" | "win" | "impsCount" | "clicksCount" | "startsCount" | "completesCount"
  >;
  averages: Pick<
    DspStatResDto,
    "ctr" | "showRate"
  >;
  totalAllTime: number;
  userStatistics: DspStatResDto[];
}
