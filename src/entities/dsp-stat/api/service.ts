import type {
  DspStatChangeReqDto,
  DspStatCreateReqDto,
  DspStatGetAllReqDto,
  DspStatGetAllResDto,
  DspStatResDto,
} from "./interfaces";
import { getTime } from "date-fns";
import { $dspStat } from "./point";

export class DspStatApiService {
  static async getAll(params: DspStatGetAllReqDto) {
    const data = await $dspStat<DspStatGetAllResDto>("/Statistic/statistic", {
      params,
    });
    data.userStatistics = data.userStatistics.sort(({ date: a = "" }, { date: b = "" }) => getTime(b) - getTime(a));
    return data;
  }

  static async create({ date, userId, ...body }: DspStatCreateReqDto) {
    return $dspStat<DspStatResDto[]>("/admin/createUserRecord", {
      method: "POST",
      body: { date: date ?? new Date().toISOString(), userId, ...body },
      params: {
        UserId: userId,
      },
    });
  }

  static async change({ id, value: _value, ...rest }: DspStatChangeReqDto) {
    const value = Array.isArray(_value) ? JSON.stringify(_value) : _value.toString();
    return $dspStat<DspStatResDto[]>(`/admin/statistic`, {
      method: "PATCH",
      body: {
        id,
        value,
        ...rest,
      },
    });
  }

  static async deleteByIds(ids: number[]) {
    return $dspStat<DspStatResDto[]>(`/admin/deleteUserRecord`, {
      method: "DELETE",
      body: ids,
    });
  }

  static async exportExcel(params: DspStatGetAllReqDto) {
    return $dspStat<Blob>("/Statistic/export-excel", {
      method: "POST",
      params,
    });
  }

  static async exportPdf(params: DspStatGetAllReqDto) {
    return $dspStat<Blob>("/Statistic/export-pdf", {
      method: "POST",
      params,
    });
  }
}
