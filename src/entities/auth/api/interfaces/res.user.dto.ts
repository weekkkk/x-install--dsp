export interface AuthResUserDto {
  id: number;
  role: "Admin" | "User";
  login: string;
  isXInstallApp: boolean;
  isDsp: boolean;
  isDspInApp: false;
  isDspBanner: false;
}
