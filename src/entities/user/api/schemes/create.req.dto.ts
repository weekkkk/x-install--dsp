import { z } from "zod";

export const userCreateReqDtoScheme = z.object({
  userId: z.number(),
  username: z.string().nonempty("Required"),
  login: z.string().nonempty("Required"),
  password: z.string().nonempty("Required"),
});

export type UserCreateReqDto = z.output<typeof userCreateReqDtoScheme>;
