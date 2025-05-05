export interface DspStatCreateReqDto {
  userId: number;
  date?: string;
  total?: number;
  ack?: number;
  win?: number;
  impsCount?: number;
  showRate?: number;
  clicksCount?: number;
  ctr?: number;
  startsCount?: number;
  completesCount?: number;
  vtr?: number;
  isDsp?: boolean;
  isDspInApp?: boolean;
  isDspBanner?: boolean;
}
