import { Button } from "../components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Input } from "../components/ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { selectUserData } from "../../store/features/userSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import conversationService from "../../services/conversation";
import { QUERY_KEYS } from "../../constants/query-keys";
import { getUserId } from "../lib/utils";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email format"),
});

export const CreateConversation = () => {
  const { user } = useSelector(selectUserData);
  const userId = user ? getUserId() : null;  // Fetch from localStorage

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email ?? "",
      name: user ? `${user.name} ${user.surname}` : "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { userId: string; userEmail: string; userName: string }) => {
      try {
        return await conversationService.create(data);
      } catch (error) {
        console.error("Error creating conversation:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER_CONVERSATION, userId],
      });
    },
  });

  // Handle form submission for starting a conversation
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("User ID:", userId);
    if (!userId) {
      console.error("User ID is missing! Form submission prevented.");
      return;
    }

    const payload = {
      userId,
      userEmail: data.email,
      userName: data.name,
    };

    console.log("Submitting payload:", payload);

    mutate(payload);
  };

  return (
    <div>
      <h1 className="text-muted-foreground text-2xl font-semibold mt-3">
        Need help? Start a conversation.
      </h1>
      <p className="my-3 text-primary">
        Fill out the form below to start a conversation with our support
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input disabled={!!user} placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={!!user}
                    placeholder="name@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isPending || !userId}>
            {isPending ? "Starting..." : "Start Conversation"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
