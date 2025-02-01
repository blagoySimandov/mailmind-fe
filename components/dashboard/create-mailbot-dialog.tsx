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

const mailbotSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  context: z.string().min(1, "Context is required"),
  triggerType: z.enum(["pattern", "keywords", "ai"]),
  pattern: z.string().optional(),
  keywords: z.string().optional(),
  aiCriteria: z.string().optional(),
});

type MailbotFormValues = z.infer<typeof mailbotSchema>;

interface CreateMailbotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateMailbotDialog({
  open,
  onOpenChange,
}: CreateMailbotDialogProps) {
  const form = useForm<MailbotFormValues>({
    resolver: zodResolver(mailbotSchema),
    defaultValues: {
      name: "",
      description: "",
      context: "",
      triggerType: "pattern",
      pattern: "",
      keywords: "",
      aiCriteria: "",
    },
  });

  const triggerType = form.watch("triggerType");

  const onSubmit = async (data: MailbotFormValues) => {
    console.log(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Mailbot</DialogTitle>
          <DialogDescription>
            Configure your mailbot to automatically respond to specific emails
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
                      <SelectItem value="pattern">Email Pattern</SelectItem>
                      <SelectItem value="keywords">Keywords</SelectItem>
                      <SelectItem value="ai">AI Criteria</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {triggerType === "pattern" && (
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

            {triggerType === "keywords" && (
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
                      <Input
                        placeholder="Enter keywords separated by commas"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {triggerType === "ai" && (
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
                onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Mailbot</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
