import { router } from "./server";
import { contactRouter } from "./routers/contact";
import { waitlistRouter } from "./routers/waitlist";
import { mailbotRouter } from "./routers/mailbots";

export const appRouter = router({
  contact: contactRouter,
  waitlist: waitlistRouter,
  mailbots: mailbotRouter,
});

export type AppRouter = typeof appRouter;
