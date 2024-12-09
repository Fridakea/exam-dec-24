import { useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { ERoutes } from "@/main";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PlusMinusInput } from "@/components/PlusMinusInput";

const formSchema = z.object({
  ticket_amount: z.number().int().min(0).max(20),
  vip_ticket_amount: z.number().int().min(0).max(20),
});

type FormData = z.infer<typeof formSchema>;

export const Step1BuyTicketsPage = () => {
  const navigate = useNavigate();

  const formObject = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ticket_amount: 0,
      vip_ticket_amount: 0,
    },
  });

  // True/false baseret på om der er valgt mindst 1 billet i alt.
  const hasAtleast1Ticket = formObject.getValues().ticket_amount > 0 || formObject.getValues().vip_ticket_amount > 0;

  const handleSubmit = (values: FormData) => {
    console.log("values: ", values);

    navigate(`${ERoutes.BUY_TICKET}/2`);
  };

  return (
    <Form {...formObject}>
      <form onSubmit={formObject.handleSubmit(handleSubmit)}>
        <h1>Køb biletter</h1>
        <FormField
          control={formObject.control}
          name="ticket_amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Partout billet</FormLabel>
              <FormControl>
                <PlusMinusInput field={field} max={20} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={!formObject.formState.isValid || !hasAtleast1Ticket} type="submit">
          Næste
        </Button>
      </form>
    </Form>
  );
};

{
  /* <Button
size="icon"
type="button"
className="h-8 w-8 shrink-0 rounded-full"
>
<Plus />
<span className="sr-only">Increase</span>
</Button> */
}
