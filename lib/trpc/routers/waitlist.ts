import { z } from "zod";
import { publicProcedure, router } from "../server";
import { db } from "@/lib/db";
import { waitlistEntries } from "@/lib/db/schema";

const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const waitlistRouter = router({
  submit: publicProcedure.input(waitlistSchema).mutation(async ({ input }) => {
    try {
      const result = await db
        .insert(waitlistEntries)
        .values({
          email: input.email,
        })
        .returning();

      console.log("Waitlist submission stored:", result[0]);

      return {
        success: true,
        message: "Thank you for joining our waitlist!",
      };
    } catch (error) {
      console.error("Error storing waitlist submission:", error);
      throw new Error("Failed to join waitlist. Please try again later.");
    }
  }),
});
