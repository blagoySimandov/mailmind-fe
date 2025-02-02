import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { type ControllerRenderProps } from "react-hook-form";
import { X } from "lucide-react";
import { trpc } from "@/lib/trpc/client";
import { useToast } from "@/hooks/use-toast";
import { mailbotSchema } from "@/lib/validators/mailbot";

type MailbotFormValues = z.infer<typeof mailbotSchema>;

interface EditMailbotDialogProps {
  mailbotId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditMailbotDialog({
  mailbotId,
  open,
  onOpenChange,
}: EditMailbotDialogProps) {
  const { toast } = useToast();
  const utils = trpc.useUtils();

  const { data: mailbots } = trpc.mailbots.getAll.useQuery();
  const mailbot = mailbots?.find((m) => m.id === mailbotId);

  const updateMailbot = trpc.mailbots.update.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Mailbot updated successfully",
      });
      onOpenChange(false);
      utils.mailbots.getAll.invalidate();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update mailbot",
        variant: "destructive",
      });
    },
  });

  const form = useForm<MailbotFormValues>({
    resolver: zodResolver(mailbotSchema),
    defaultValues: {
      name: mailbot?.name || "",
      description: mailbot?.description || "",
      context: mailbot?.context || "",
      triggerType: mailbot?.triggerType || "EMAIL_PATTERN",
      pattern: mailbot?.pattern || "*",
      keywords: mailbot?.keywords || [],
      aiCriteria: mailbot?.aiCriteria || "",
      userId: mailbot?.userId || "",
    },
  });

  const triggerType = form.watch("triggerType");

  const onSubmit = async (data: MailbotFormValues) => {
    updateMailbot.mutate({
      id: mailbotId,
      data,
    });
  };

  if (!mailbot) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Mailbot</DialogTitle>
          <DialogDescription>
            Modify your mailbot&apos;s configuration
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({
                field,
              }: {
                field: ControllerRenderProps<MailbotFormValues, "name">;
              }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Support Assistant" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({
                field,
              }: {
                field: ControllerRenderProps<MailbotFormValues, "description">;
              }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Handles customer support inquiries"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="context"
              render={({
                field,
              }: {
                field: ControllerRenderProps<MailbotFormValues, "context">;
              }) => (
                <FormItem>
                  <FormLabel>Context</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide context and instructions for your mailbot..."
                      className="h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="triggerType"
              render={({
                field,
              }: {
                field: ControllerRenderProps<MailbotFormValues, "triggerType">;
              }) => (
                <FormItem>
                  <FormLabel>Trigger Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select when to respond" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="EMAIL_PATTERN">
                        Email Pattern
                      </SelectItem>
                      <SelectItem value="IN_BODY_KEYWORDS">Keywords</SelectItem>
                      <SelectItem value="BODY_AI_ANALYSIS">
                        AI Criteria
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {triggerType === "EMAIL_PATTERN" && (
              <FormField
                control={form.control}
                name="pattern"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<MailbotFormValues, "pattern">;
                }) => (
                  <FormItem>
                    <FormLabel>Email Pattern</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., *@company.com or specific email addresses"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {triggerType === "IN_BODY_KEYWORDS" && (
              <FormField
                control={form.control}
                name="keywords"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<MailbotFormValues, "keywords">;
                }) => (
                  <FormItem>
                    <FormLabel>Keywords</FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap gap-2 p-2 bg-background rounded-md border min-h-[38px]">
                          {field.value?.map((keyword, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md">
                              <span>{keyword}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const newKeywords = [...(field.value || [])];
                                  newKeywords.splice(index, 1);
                                  field.onChange(newKeywords);
                                }}
                                className="text-primary hover:text-primary/80">
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                          <Input
                            className="border-0 w-[200px] focus-visible:ring-0 px-0 placeholder:text-muted-foreground"
                            placeholder="Type and press Enter to add"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const value = e.currentTarget.value.trim();
                                if (value) {
                                  field.onChange([
                                    ...(field.value || []),
                                    value,
                                  ]);
                                  e.currentTarget.value = "";
                                }
                              }
                            }}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Press Enter after each keyword
                        </p>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {triggerType === "BODY_AI_ANALYSIS" && (
              <FormField
                control={form.control}
                name="aiCriteria"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<MailbotFormValues, "aiCriteria">;
                }) => (
                  <FormItem>
                    <FormLabel>AI Criteria</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the criteria for emails that should be responded to..."
                        className="h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={updateMailbot.isLoading}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={updateMailbot.isLoading || !form.formState.isValid}>
                {updateMailbot.isLoading ? "Updating..." : "Update Mailbot"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
