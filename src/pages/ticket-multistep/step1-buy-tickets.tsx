import { useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { ERoutes } from "@/main";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PlusMinusInput } from "@/components/PlusMinusInput";
import { RadioCard } from "@/components/RadioCard";

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
      <form onSubmit={formObject.handleSubmit(handleSubmit)} className="flex flex-col">
        <h1 className="mb-8 flex items-start">
          Køb biletter
          <span className="~text-xl/2xl -mt-2">*</span>
        </h1>
        <FormField
          control={formObject.control}
          name="ticket_amount"
          render={({ field }) => (
            <FormItem className="flex flex-row mb-5">
              <div className="flex flex-col flex-1">
                <FormLabel>Partout billet</FormLabel>
                <FormDescription>799 KR</FormDescription>
              </div>
              <FormControl>
                <PlusMinusInput field={field} max={20} className="" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={formObject.control}
          name="vip_ticket_amount"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center mb-5">
              <div className="flex flex-col flex-1">
                <FormLabel className="">VIP Partout billet</FormLabel>
                <FormDescription>1299 KR</FormDescription>
              </div>
              <FormControl>
                <PlusMinusInput field={field} max={20} className="" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <h1 className="mt-10 mb-8  flex items-start">
          Tilkøb
          <span className="~text-xl/2xl -mt-2">*</span>
        </h1>

        <FormField
          name="area"
          render={() => (
            <FormItem className="mb-12">
              <FormLabel>Vælg camping område</FormLabel>
              <FormDescription>Reservationsgebyr på 99 kr</FormDescription>

              <div className="flex flex-row flex-wrap gap-4">
                <FormItem>
                  <FormControl>
                    <RadioCard
                      id="svartheim"
                      value="Svartheim"
                      name="Area"
                      header="Svartheim"
                      subHeader="100 ledige pladser"
                    />
                  </FormControl>
                </FormItem>

                <FormItem>
                  <FormControl>
                    <RadioCard
                      id="nilfheim"
                      value="Nilfheim"
                      name="Area"
                      header="Nilfheim"
                      subHeader="300 ledige pladser"
                    />
                  </FormControl>
                </FormItem>

                <FormItem>
                  <FormControl>
                    <RadioCard
                      id="helheim"
                      value="Helheim"
                      name="Area"
                      header="Helheim"
                      subHeader="100 ledige pladser"
                    />
                  </FormControl>
                </FormItem>

                <FormItem>
                  <FormControl>
                    <RadioCard
                      id="muspelheim"
                      value="Muspelheim"
                      name="Area"
                      header="Muspelheim"
                      subHeader="300 ledige pladser"
                    />
                  </FormControl>
                </FormItem>

                <FormItem>
                  <FormControl>
                    <RadioCard
                      id="alfheim"
                      value="Alfheim"
                      name="Area"
                      header="Alfheim"
                      subHeader="300 ledige pladser"
                    />
                  </FormControl>
                </FormItem>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          variant="accent"
          className="self-end"
          disabled={!formObject.formState.isValid || !hasAtleast1Ticket}
          type="submit"
        >
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
