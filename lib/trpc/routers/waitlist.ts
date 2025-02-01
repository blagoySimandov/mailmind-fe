import { z } from "zod";
import { publicProcedure, router } from "../server";
import { db } from "@/lib/db";
import { waitlistEntries } from "@/lib/db/schema";
import sgMail from "@sendgrid/mail";
import fs from "fs";
import path from "path";

if (!process.env.SENDGRID_API_KEY) {
  throw Error("Environment variable SENDGRID_API_KEY is missing");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Load the email template
const emailTemplatePath = path.join(
  process.cwd(),
  "templates",
  "waitlistEmail.html"
);
const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");

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

      const msg = {
        to: input.email,
        from: "no-reply@mailmind.net",
        subject: "Welcome to MailMind!",
        text: "Thank you for joining the MailMind waitlist. We're excited to bring you a revolutionary communication experience. Stay tuned for more updates!",
        html: emailTemplate,
      };

      await sgMail.send(msg);
      console.log("Email sent to", input.email);

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
