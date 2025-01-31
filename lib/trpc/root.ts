import { router } from "./server";
import { contactRouter } from "./routers/contact";
import { waitlistRouter } from "./routers/waitlist";

export const appRouter = router({
  contact: contactRouter,
  waitlist: waitlistRouter,
});

export type AppRouter = typeof appRouter;
