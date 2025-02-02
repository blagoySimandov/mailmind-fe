import { Card } from "@/components/ui/card";

export function EmptyState() {
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
