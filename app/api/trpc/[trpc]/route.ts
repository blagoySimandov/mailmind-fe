import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/lib/trpc/root";
import { getServerSession } from "next-auth";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: async () => {
      const session = await getServerSession();
      return { session };
    },
  });

export { handler as GET, handler as POST };
