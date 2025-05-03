import type { DspStatResDto } from "./res.dto";

export interface DspStatGetAllResDto {
  total: Pick<
    DspStatResDto,
    "total" | "ack" | "win" | "impsCount" | "clicksCount" | "startsCount" | "completesCount"
  >;
  totalAllTime: number;
  userStatistics: DspStatResDto[];
}
