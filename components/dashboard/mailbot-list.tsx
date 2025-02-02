"use client";

import { trpc } from "@/lib/trpc/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { MailbotCard } from "./mailbot-list/MailbotCard";
import { DeleteMailbotDialog } from "./mailbot-list/DeleteMailbotDialog";
import { EmptyState } from "./mailbot-list/EmptyState";
import { LoadingState } from "./mailbot-list/LoadingState";
import EditMailbotDialog from "./edit-mailbot-dialog";

export default function MailbotList() {
  const { toast } = useToast();
  const utils = trpc.useUtils();
  const [mailbotToDelete, setMailbotToDelete] = useState<string | null>(null);
  const [mailbotToEdit, setMailbotToEdit] = useState<string | null>(null);

  const { data: mailbots, isLoading } = trpc.mailbots.getAll.useQuery();
  const deleteMutation = trpc.mailbots.delete.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Mailbot deleted successfully",
      });
      utils.mailbots.getAll.invalidate();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete mailbot",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return <LoadingState />;
  }

  if (!mailbots || mailbots.length === 0) {
    return <EmptyState />;
  }

  const handleDelete = (id: string) => {
    setMailbotToDelete(id);
  };

  const confirmDelete = () => {
    if (mailbotToDelete) {
      deleteMutation.mutate({ id: mailbotToDelete });
      setMailbotToDelete(null);
    }
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mailbots.map((mailbot) => (
          <MailbotCard
            key={mailbot.id}
            mailbot={mailbot}
            onEdit={setMailbotToEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <DeleteMailbotDialog
        open={!!mailbotToDelete}
        onOpenChange={() => setMailbotToDelete(null)}
        onConfirm={confirmDelete}
      />

      {mailbotToEdit && (
        <EditMailbotDialog
          mailbotId={mailbotToEdit}
          open={!!mailbotToEdit}
          onOpenChange={(open) => !open && setMailbotToEdit(null)}
        />
      )}
    </>
  );
}
