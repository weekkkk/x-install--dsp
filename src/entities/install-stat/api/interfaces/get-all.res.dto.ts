import type { InstallStatResDto } from "./res.dto";

export interface InstallStatGetAllResDto {
  total: Pick<
    InstallStatResDto,
    "total" | "totalInstall"
  >;
  totalAllTime: number;
  userStatistics: InstallStatResDto[];
}
