export interface AuthResUserDto {
  id: number;
  role: "Admin" | "User";
  login: string;
  isDsp: true;
  isDspInApp: false;
  isDspBanner: false;
}
