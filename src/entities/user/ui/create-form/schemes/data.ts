import { z } from "zod";

export const userCreateFormDataSchema = z.object({
  id: z.string().min(1),
  login: z.string().min(1),
  password: z.string().min(1),
  name: z.string().min(1),
});

export type TUserCreateFormData = z.infer<typeof userCreateFormDataSchema>;
