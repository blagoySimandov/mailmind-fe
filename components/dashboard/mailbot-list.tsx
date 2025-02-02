"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { trpc } from "@/lib/trpc/client";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
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
    return (
      <Card className="flex flex-col items-center justify-center p-8 text-center">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Loading mailbots...</h3>
        </div>
      </Card>
    );
  }

  if (!mailbots || mailbots.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-8 text-center">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">No mailbots yet</h3>
          <p className="text-sm text-muted-foreground">
            Create your first mailbot to start automating your email responses
          </p>
        </div>
      </Card>
    );
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
          <Card key={mailbot.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {mailbot.name}
                </CardTitle>
                <CardDescription>{mailbot.description}</CardDescription>
              </div>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => setMailbotToEdit(mailbot.id)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => handleDelete(mailbot.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Type:</strong>{" "}
                  {mailbot.triggerType === "EMAIL_PATTERN"
                    ? `Pattern: ${mailbot.pattern}`
                    : mailbot.triggerType === "IN_BODY_KEYWORDS"
                      ? `Keywords: ${mailbot.keywords?.join(", ")}`
                      : `AI Criteria`}
                </div>
                <div>
                  <strong>Context:</strong>
                  <p className="mt-1 text-muted-foreground">
                    {mailbot.context}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog
        open={!!mailbotToDelete}
        onOpenChange={() => setMailbotToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              mailbot and all of its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
