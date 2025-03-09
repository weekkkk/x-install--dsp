export type AuthResDto = {
  accessToken: string;
  user: {
    id: number;
    role: "Admin" | "User";
    login: string;
    isDsp: true;
    isDspInApp: false;
    isDspBanner: false;
  };
};
