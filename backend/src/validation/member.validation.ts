import { z } from "zod";

export const createMemberSchema = z.object({
  fullName: z.string().min(1),
  email: z.email(),
  status: z.enum(["active", "inactive"]),
});

export const updateMemberStatusSchema = z.object({
  status: z.enum(["active", "inactive"]),
});
