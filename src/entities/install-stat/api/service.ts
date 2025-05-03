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
    return data;
  }

  static async create({ date, ...body }: InstallStatCreateReqDto) {
    return $installStat<InstallStatResDto[]>("/admin/createUserRecord-xinstallapp", {
      method: "POST",
      body: { date: date ?? new Date().toISOString(), ...body },
    });
  }

  static async change({ id, value: _value, ...rest }: InstallStatChangeReqDto) {
    const value = Array.isArray(_value) ? JSON.stringify(_value) : _value.toString();
    return $installStat<InstallStatResDto[]>(`/admin/statistic-xinstall`, {
      method: "PATCH",
      body: {
        id,
        value,
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
