import { protectedProcedure, router } from "../server";
import { db } from "@/lib/db";
import { mailbots } from "@/lib/db/schema";
import { TRPCError } from "@trpc/server";
import { mailbotSchema } from "@/lib/validators/mailbot";
import { InferInsertModel, eq } from "drizzle-orm";
import { z } from "zod";

type NewMailbot = InferInsertModel<typeof mailbots>;

export const mailbotRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.user?.id) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to view mailbots",
      });
    }

    try {
      const userId = ctx.session.user.id as string;
      const result = await db
        .select()
        .from(mailbots)
        .where(eq(mailbots.userId, userId));

      return result;
    } catch (error) {
      console.error("Error fetching mailbots:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch mailbots",
        cause: error,
      });
    }
  }),

  create: protectedProcedure
    .input(mailbotSchema.omit({ userId: true }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user?.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to create mailbots",
        });
      }

      try {
        const userId = ctx.session.user.id as string;
        const mailbotData: NewMailbot = {
          name: input.name,
          description: input.description ?? "",
          context: input.context,
          triggerType: input.triggerType,
          pattern: input.pattern ?? "*",
          keywords: input.keywords ?? [],
          aiCriteria: input.aiCriteria ?? "",
          userId,
        };

        const result = await db
          .insert(mailbots)
          .values(mailbotData)
          .returning();

        if (!result[0]) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create mailbot",
          });
        }

        return result[0];
      } catch (error) {
        console.error("Error creating mailbot:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create mailbot",
          cause: error,
        });
      }
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user?.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to delete mailbots",
        });
      }

      try {
        const userId = ctx.session.user.id as string;
        // First check if the mailbot belongs to the user
        const mailbot = await db
          .select()
          .from(mailbots)
          .where(eq(mailbots.id, input.id))
          .then((res) => res[0]);

        if (!mailbot) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Mailbot not found",
          });
        }

        if (mailbot.userId !== userId) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You can only delete your own mailbots",
          });
        }

        const result = await db
          .delete(mailbots)
          .where(eq(mailbots.id, input.id))
          .returning();

        return result[0];
      } catch (error) {
        console.error("Error deleting mailbot:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete mailbot",
          cause: error,
        });
      }
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: mailbotSchema.partial().omit({ userId: true }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user?.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to update mailbots",
        });
      }

      try {
        const userId = ctx.session.user.id as string;
        // First check if the mailbot belongs to the user
        const mailbot = await db
          .select()
          .from(mailbots)
          .where(eq(mailbots.id, input.id))
          .then((res) => res[0]);

        if (!mailbot) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Mailbot not found",
          });
        }

        if (mailbot.userId !== userId) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You can only update your own mailbots",
          });
        }

        const updateData: Partial<NewMailbot> = {
          ...input.data,
          userId, // Ensure userId doesn't change
        };

        const result = await db
          .update(mailbots)
          .set(updateData)
          .where(eq(mailbots.id, input.id))
          .returning();

        return result[0];
      } catch (error) {
        console.error("Error updating mailbot:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update mailbot",
          cause: error,
        });
      }
    }),
});
