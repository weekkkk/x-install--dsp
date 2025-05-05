import type { AuthResUserDto } from "../interfaces";

export function useAuthApiUser() {
  const user = useState <AuthResUserDto | null | undefined> ("user");
  return user;
}
