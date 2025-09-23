export interface InstallStatCreateReqDto {
  userId: number;
  date?: string;
  total?: number;
  appLink?: string;
  appName?: string;
  region?: string;
  keywordsWithTotalInstall?: string[];
  totalInstall?: number;
  complited?: number;
}
