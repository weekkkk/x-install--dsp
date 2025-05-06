export interface InstallStatResDto {
  id: number;
  date?: string;
  total?: number;
  appLink?: string;
  appName?: string;
  region?: string;
  regionList?: string[];
  keywords?: string[];
  keywordsWithTotalInstall?: [string, number | undefined][];
  totalInstall?: number;
  complited?: number;
}
