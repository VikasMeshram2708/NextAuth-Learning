import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(100),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>
