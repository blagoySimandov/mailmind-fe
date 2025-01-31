import { z } from "zod";
import { publicProcedure, router } from "../server";
import { db } from "@/lib/db";
import { contactSubmissions } from "@/lib/db/schema";

const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company name is required"),
  industry: z.enum(
    ["property", "recruiting", "healthcare", "education", "other"],
    {
      required_error: "Please select an industry",
    }
  ),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

export const contactRouter = router({
  submit: publicProcedure
    .input(contactFormSchema)
    .mutation(async ({ input }) => {
      try {
        const result = await db
          .insert(contactSubmissions)
          .values({
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            company: input.company,
            industry: input.industry,
            message: input.message,
          })
          .returning();

        console.log("Contact form submission stored:", result[0]);

        return {
          success: true,
          message: "Thank you for your interest! We will contact you shortly.",
        };
      } catch (error) {
        console.error("Error storing submission:", error);
        throw new Error("Failed to submit form. Please try again later.");
      }
    }),
});
