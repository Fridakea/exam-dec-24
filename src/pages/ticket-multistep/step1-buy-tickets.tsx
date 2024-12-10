import { useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { ERoutes } from "@/main";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PlusMinusInput } from "@/components/PlusMinusInput";
import { RadioCard } from "@/components/RadioCard";
import { useState } from "react";
import { mockApiAreas } from "@/mockdata";

const formSchema = z.object({
  ticket_amount: z.number().int().min(0).max(20),
  vip_ticket_amount: z.number().int().min(0).max(20),
});

type FormData = z.infer<typeof formSchema>;

export const Step1BuyTicketsPage = () => {
  const navigate = useNavigate();
  const [checkedRadio, setCheckedRadio] = useState("Nilfheim");

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

  console.log(checkedRadio);

  return (
    <Form {...formObject}>
      <form onSubmit={formObject.handleSubmit(handleSubmit)} className="flex flex-col">
        <h1 className="mb-8 flex items-start">
          Køb biletter
          <span className="~text-lg/xl -mt-2">*</span>
        </h1>

        <FormField
          control={formObject.control}
          name="ticket_amount"
          render={({ field }) => (
            <FormItem className="mb-6 flex flex-row items-center">
              <div className="flex flex-col gap-1 flex-1">
                <FormLabel>Partout billet</FormLabel>
                <FormDescription>799 KR</FormDescription>
              </div>
              <FormControl>
                <PlusMinusInput field={field} max={20} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={formObject.control}
          name="vip_ticket_amount"
          render={({ field }) => (
            <FormItem className="mb-6 flex flex-row items-center">
              <div className="flex flex-col gap-1 flex-1">
                <FormLabel>VIP Partout billet</FormLabel>
                <FormDescription>1299 KR</FormDescription>
              </div>
              <FormControl>
                <PlusMinusInput field={field} max={20} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <h1 className="mt-10 mb-8  flex items-start">
          Tilkøb
          <span className="~text-lg/xl -mt-2">*</span>
        </h1>

        <FormField
          name="area"
          render={() => (
            <FormItem className="mb-12">
              <FormLabel>Vælg camping område</FormLabel>
              <FormDescription>Reservationsgebyr på 99 kr</FormDescription>

              <div className="flex flex-row flex-wrap gap-4">
                {mockApiAreas.map((areaObj) => (
                  <FormItem key={areaObj.area}>
                    <FormControl>
                      <RadioCard
                        id={areaObj.area}
                        value={areaObj.area}
                        name="area-radio-group"
                        header={areaObj.area}
                        subHeader={`${areaObj.available} ledige pladser`}
                        isChecked={checkedRadio === areaObj.area}
                        onChange={(newValue) => setCheckedRadio(newValue)}
                      />
                    </FormControl>
                  </FormItem>
                ))}
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
