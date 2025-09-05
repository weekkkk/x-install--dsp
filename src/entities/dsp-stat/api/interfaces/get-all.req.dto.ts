export interface DspStatGetAllReqDto {
  UserId?: number;
  StartDate?: string;
  EndDate?: string;
  IsDsp?: boolean;
  IsDspInApp?: boolean;
  IsDspBanner?: boolean;
  TimeZone?: string;
}
