"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateMailbotDialog from "@/components/dashboard/create-mailbot-dialog";
import MailbotList from "@/components/dashboard/mailbot-list";

export default function DashboardPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="container mx-auto py-8 space-y-8">
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
    </div>
  );
}
