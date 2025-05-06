import type {
  InstallStatChangeReqDto,
  InstallStatCreateReqDto,
  InstallStatGetAllReqDto,
  InstallStatGetAllResDto,
  InstallStatResDto,
} from "./interfaces";
import { getTime } from "date-fns";
import { $installStat } from "./point";

export class InstallStatApiService {
  static async getAll(params: InstallStatGetAllReqDto) {
    const data = await $installStat<InstallStatGetAllResDto>("/Statistic/statistic-xinstall", {
      params,
    });
    data.userStatistics = data.userStatistics.sort(({ date: a = "" }, { date: b = "" }) => getTime(b) - getTime(a)).map(({ keywords, ...rest }) => {
      let totalInstall = 0;
      const keywordsWithTotalInstall = keywords?.map((key): [string, number | undefined] => {
        try {
          const w = JSON.parse(key);
          if (Array.isArray(w)) {
            const [key, value] = w as [string, number | undefined];
            if (value)
              totalInstall += value;
            return [key, value];
          }
          return ["none", undefined];
        }
        catch {
          return [key, undefined];
        }
      });
      return { ...rest, keywords, keywordsWithTotalInstall, totalInstall };
    });

    return data;
  }

  static async create({ date, keywordsWithTotalInstall, ...body }: InstallStatCreateReqDto) {
    return $installStat<InstallStatResDto[]>("/admin/createUserRecord-xinstallapp", {
      method: "POST",
      body: { date: date ?? new Date().toISOString(), keywords: keywordsWithTotalInstall?.map(el => JSON.stringify(el)), ...body },
    });
  }

  static async change({ id, value: _value, key }: InstallStatChangeReqDto) {
    let value: string | undefined;
    if (Array.isArray(_value)) {
      value = JSON.stringify(_value.map((el) => {
        if (Array.isArray(el)) {
          return JSON.stringify(el);
        }
        return el;
      }));
    }
    else {
      value = _value?.toString();
    }
    return $installStat<InstallStatResDto[]>(`/admin/statistic-xinstall`, {
      method: "PATCH",
      body: {
        id,
        value,
        key: key === "keywordsWithTotalInstall" ? "keywords" : key,
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
