import { z } from "zod";

export const authLoginReqDtoScheme = z.object({
  login: z.string().nonempty("Required"),
  password: z.string().nonempty("Required"),
});

export type AuthLoginReqDto = z.output<typeof authLoginReqDtoScheme>;
