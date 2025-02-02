import { Card } from "@/components/ui/card";

export function LoadingState() {
  return (
    <Card className="flex flex-col items-center justify-center p-8 text-center">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Loading mailbots...</h3>
      </div>
    </Card>
  );
}
