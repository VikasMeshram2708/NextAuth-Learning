import * as z from "zod";

export const UserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(5).max(100),
});

export type UserSchemaType = z.infer<typeof UserSchema>
