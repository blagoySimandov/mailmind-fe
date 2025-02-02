import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { type mailbots } from "@/lib/db/schema";
import { type InferSelectModel } from "drizzle-orm";

type Mailbot = InferSelectModel<typeof mailbots>;

interface MailbotCardProps {
  mailbot: Mailbot;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function MailbotCard({ mailbot, onEdit, onDelete }: MailbotCardProps) {
  return (
    <Card>
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
            <DropdownMenuItem onClick={() => onEdit(mailbot.id)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onDelete(mailbot.id)}>
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
            <p className="mt-1 text-muted-foreground">{mailbot.context}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
