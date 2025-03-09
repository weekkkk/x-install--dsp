export type StatGetAllResDto = {
  averages: Pick<StatResDto, "ctr" | "showRate">;
  total: Pick<
    StatResDto,
    | "total"
    | "ack"
    | "clicksCount"
    | "completesCount"
    | "impsCount"
    | "startsCount"
    | "win"
  >;
  totalAllTime: number;
  userStatistics: StatResDto[];
};
