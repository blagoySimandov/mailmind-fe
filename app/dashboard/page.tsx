"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateMailbotDialog from "@/components/dashboard/create-mailbot-dialog";
import { useSession } from "next-auth/react";
import MailbotList from "@/components/dashboard/mailbot-list";
import Navbar from "@/components/dashboard/navbar";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/signin");
    },
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <main className="container mx-auto py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Your Mailbots</h1>
            <p className="text-muted-foreground">
              Create and manage your automated email responders
            </p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Mailbot
          </Button>
        </div>

        <MailbotList />

        <CreateMailbotDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
        />
      </main>
    </div>
  );
}
