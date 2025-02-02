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

interface Mailbot {
  id: string;
  name: string;
  description: string;
  triggerType: "pattern" | "keywords" | "ai";
  pattern?: string;
  keywords?: string;
  aiCriteria?: string;
  active: boolean;
}

export default function MailbotList() {
  const mailbots: Mailbot[] = []; // TODO: Replace with actual data fetching

  if (mailbots.length === 0) {
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

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {mailbots.map((mailbot) => (
        <Card key={mailbot.id}>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="flex items-center gap-2">
                {mailbot.name}
                <Badge variant={mailbot.active ? "default" : "secondary"}>
                  {mailbot.active ? "Active" : "Inactive"}
                </Badge>
              </CardTitle>
              <CardDescription>{mailbot.description}</CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <strong>Type:</strong>{" "}
              {mailbot.triggerType === "pattern"
                ? `Pattern: ${mailbot.pattern}`
                : mailbot.triggerType === "keywords"
                  ? `Keywords: ${mailbot.keywords}`
                  : `AI Criteria`}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
