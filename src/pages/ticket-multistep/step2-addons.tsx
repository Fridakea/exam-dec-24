import { FormEventHandler } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { ERoutes } from "@/main";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusMinusInput } from "@/components/PlusMinusInput";

const formSchema = z.object({
  chair_amount: z.number().int().min(0).max(20),
  pavillon_amount: z.number().int().min(0).max(20),
  small_tent_amount: z.number().int().min(0).max(20),
  medium_tent_amount: z.number().int().min(0).max(20),
  large_tent_amount: z.number().int().min(0).max(20),
});

type FormData = z.infer<typeof formSchema>;

export const Step2BuyAddonsPage = () => {
  const navigate = useNavigate();

  const formObject = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chair_amount: 0,
      pavillon_amount: 0,
      small_tent_amount: 0,
      medium_tent_amount: 0,
      large_tent_amount: 0,
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(e);
    navigate(`${ERoutes.BUY_TICKET}/3`);
  };

  return (
    <Form {...formObject}>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <h1 className="mb-8 flex items-start gap-1">
          Tilvalg
          <span className="~text-base/lg -mt-2">(Optional)</span>
        </h1>

        <div className="mb-10 flex justify-between items-center gap-3">
          <div className="flex flex-col leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Green camping
            </label>
            <p className="mb-1 text-sm text-muted-foreground">Modtag kun genanvendeligt og miljøbevist festival gear</p>
            <p className="text-sm text-muted-foreground">249 KR</p>
          </div>

          <Checkbox id="terms1" />
        </div>

        <h2 className="mb-8">Camping Gear</h2>

        <FormField
          control={formObject.control}
          name="chair_amount"
          render={({ field }) => (
            <FormItem className="mb-6 flex flex-row items-center">
              <div className="flex flex-col gap-1 flex-1">
                <FormLabel className="leading-snug">Festival stol m. kopholder</FormLabel>
                <FormDescription>79 KR</FormDescription>
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
          name="pavillon_amount"
          render={({ field }) => (
            <FormItem className="mb-6 flex flex-row items-center">
              <div className="flex flex-col gap-1 flex-1">
                <FormLabel>Festival pavillon</FormLabel>
                <FormDescription>149 KR</FormDescription>
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
          name="small_tent_amount"
          render={({ field }) => (
            <FormItem className="mb-6 flex flex-row items-center">
              <div className="flex flex-col gap-1 flex-1">
                <FormLabel>1 personers telt</FormLabel>
                <FormDescription>199 KR</FormDescription>
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
          name="medium_tent_amount"
          render={({ field }) => (
            <FormItem className="mb-6 flex flex-row items-center">
              <div className="flex flex-col gap-1 flex-1">
                <FormLabel>2 personers telt</FormLabel>
                <FormDescription>299 KR</FormDescription>
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
          name="large_tent_amount"
          render={({ field }) => (
            <FormItem className="mb-6 flex flex-row items-center">
              <div className="flex flex-col gap-1 flex-1">
                <FormLabel>3 personers telt</FormLabel>
                <FormDescription>399 KR</FormDescription>
              </div>
              <FormControl>
                <PlusMinusInput field={field} max={20} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="accent" className="self-end" type="submit">
          Næste
        </Button>
      </form>
    </Form>
  );
};
