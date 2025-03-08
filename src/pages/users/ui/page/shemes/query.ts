import { z } from "zod";

export const usersPageQueryShema = z.object({
  user: z.string().optional(),
  mode: z.enum(["del", "view"]),
  search: z.string().optional(),
});

export type TUsersPageQuery = z.infer<typeof usersPageQueryShema>;
