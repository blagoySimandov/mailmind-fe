import { protectedProcedure, router } from "../server";
import { db } from "@/lib/db";
import { mailbots } from "@/lib/db/schema";
import { TRPCError } from "@trpc/server";
import { mailbotSchema } from "@/lib/validators/mailbot";


export const mailbotRouter = router({
  create: protectedProcedure
    .input(mailbotSchema)
    .mutation(async ({ input }) => {
      try {
        const result = await db
          .insert(mailbots)
          .values({
            name: input.name,
            description: input.description ?? "",
            context: input.context,
            triggerType: input.triggerType,
            pattern: input.pattern ?? "*",
            keywords: input.keywords ?? [],
            aiCriteria: input.aiCriteria,
            userId: input.userId,
          })
          .returning();
        if (!result[0]) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create mailbot",
          });
        }

        return result[0];
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create mailbot",
          cause: error,
        });
      }
    }),
});
