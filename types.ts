import { z } from "zod";

export const inputSchema = z.object({
  ipAddress: z.string().ip(),
});

export type inputType = z.infer<typeof inputSchema>;