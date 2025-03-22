import { $stat } from "./point";
import type {
  StatCreateReqDto,
  StatGetAllReqDto,
  StatGetAllResDto,
  StatResDto,
  StatChangeReqDto,
} from "./types";

export class StatApiService {
  static async getAll(params: StatGetAllReqDto) {
    return $stat<StatGetAllResDto>("/Statistic/statistic", {
      params,
    });
  }

  static async create({ userId: UserId, ...body }: StatCreateReqDto) {
    return $stat<StatResDto[]>("/admin/createUserRecord", {
      method: "POST",
      body,
      params: {
        UserId,
      },
    });
  }

  static async change({ id, ...rest }: StatChangeReqDto) {
    return $stat<StatResDto[]>(`/admin/statistic`, {
      method: "PATCH",
      body: {
        id,
        ...rest,
      },
    });
  }

  static async deleteByIds(ids: Number[]) {
    return $stat<StatResDto[]>(`/admin/deleteUserRecord`, {
      method: "DELETE",
      body: ids,
    });
  }
  static async exportExcel(params: StatGetAllReqDto) {
    return $stat<Blob>("/Statistic/export-excel", {
      method: 'POST',
      params,
    });
  }
  static async exportPdf(params: StatGetAllReqDto) {
    return $stat<Blob>("/Statistic/export-pdf", {
      method: 'POST',
      params,
    });
  }
}
