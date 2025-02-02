import { z } from "zod"

export const TriggerTypeEnum = z.enum([
  "EMAIL_PATTERN",
  "IN_BODY_KEYWORDS",
  "BODY_AI_ANALYSIS",
]);

export const mailbotSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  context: z.string().min(1, "Context is required"),
  triggerType: TriggerTypeEnum,
  pattern: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  aiCriteria: z.string().optional(),
  userId: z.string(),
});
