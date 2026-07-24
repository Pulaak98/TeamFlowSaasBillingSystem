import { z } from "zod";

export const createCreditUsageSchema = z.object({
  amount: z.number().int().positive(),
  source: z.string().min(1).max(100),
  referenceId: z.string().min(1).max(255),
});
