import { z } from "zod";

export const userCreateFormDataSchema = z.object({
  id: z.string(),
  login: z.string(),
  password: z.string(),
  name: z.string(),
});

export type TUserCreateFormData = z.infer<typeof userCreateFormDataSchema>;
