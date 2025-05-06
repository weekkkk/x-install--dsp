export interface InstallStatCreateReqDto {
  userId: number;
  date?: string;
  total?: number;
  appLink?: string;
  appName?: string;
  regionList?: string;
  keywordsWithTotalInstall?: string[];
  totalInstall?: number;
  complited?: number;
}
