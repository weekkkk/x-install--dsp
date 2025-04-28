import type {
  InstallStatChangeReqDto,
  InstallStatCreateReqDto,
  InstallStatGetAllReqDto,
  InstallStatGetAllResDto,
  InstallStatResDto,
} from "./interfaces";
import { $installStat } from "./point";

export class InstallStatApiService {
  static async getAll(params: InstallStatGetAllReqDto) {
    const data = await $installStat<InstallStatGetAllResDto>("/Statistic/statistic-xinstall", {
      params,
    });
    console.log(data);
    return data;
  }

  static async create({ userId: UserId, ...body }: InstallStatCreateReqDto) {
    return $installStat<InstallStatResDto[]>("/admin/createUserRecord-xinstallapp", {
      method: "POST",
      body,
      params: {
        UserId,
      },
    });
  }

  static async change({ id, ...rest }: InstallStatChangeReqDto) {
    return $installStat<InstallStatResDto[]>(`/admin/statistic-xinstall`, {
      method: "PATCH",
      body: {
        id,
        ...rest,
      },
    });
  }

  static async deleteByIds(ids: number[]) {
    return $installStat<InstallStatResDto[]>(`/admin/deleteUserRecord-xinstallapp`, {
      method: "DELETE",
      body: ids,
    });
  }

  static async exportExcel(params: InstallStatGetAllReqDto) {
    return $installStat<Blob>("/Statistic/export-excel-xinstallapp", {
      method: "POST",
      params,
    });
  }

  static async exportPdf(params: InstallStatGetAllReqDto) {
    return $installStat<Blob>("/Statistic/export-pdf-xinstall", {
      method: "POST",
      params,
    });
  }
}
