import { z } from "zod";

export const authLoginFormDataSchema = z.object({
  login: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

export type TAuthLoginFormData = z.infer<typeof authLoginFormDataSchema>;
