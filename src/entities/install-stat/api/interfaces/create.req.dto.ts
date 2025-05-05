export interface InstallStatCreateReqDto {
  userId: number;
  date?: string;
  total?: number;
  appLink?: string;
  appName?: string;
  region?: string;
  keywords?: string[];
  totalInstall?: number;
  complited?: number;
}
