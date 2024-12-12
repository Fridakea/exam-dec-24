import { FormEventHandler } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ERoutes } from "@/main";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  contact_info: z.array(
    z.object({
      first_name: z.string().min(2, "Fornavnet skal være mindst 2 bogstaver"),
      last_name: z.string().min(2, "Efternavnet skal være mindst 2 bogstaver"),
      telephone: z.number().int().min(8, "Et telefon nummer er minimum 8 cifre"),
      email: z.string().email("Ugyldig email"),
    })
  ),
});

type FormData = z.infer<typeof formSchema>;

const ticketsBooked = 3;
const ticketNumbers = Array.from({ length: ticketsBooked }, (_, i) => i + 1);

export const Step3ContactInformationPage = () => {
  const navigate = useNavigate();

  const formObject = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contact_info: ticketNumbers.map((_) => ({
        first_name: "",
        last_name: "",
        telephone: undefined,
        email: "",
      })),
    },
    mode: "onTouched",
  });

  const handleSubmit = (values: FormData) => {
    console.log(values);
    navigate(`${ERoutes.BUY_TICKET}/4`);
  };

  console.log(formObject.getValues());

  return (
    <Form {...formObject}>
      <form onSubmit={formObject.handleSubmit(handleSubmit)} className="flex flex-col">
        <h1 className="mb-8">Kontaktoplysninger</h1>

        <div className="*:mb-2">
          <p>Type Billet</p>
          <p>Festival gæst nr. {"i"}</p>

          <FormField
            control={formObject.control}
            name="contact_info"
            render={() => (
              <FormItem>
                {ticketNumbers.map((ticket) => (
                  <FormField
                    key={ticket}
                    control={formObject.control}
                    name="contact_info"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Billet {ticket}</FormLabel>
                        <FormControl>
                          <fieldset>
                            <div className="flex flex-col sm:flex-row gap-3 *:flex-1">
                              <label>Fornavn</label>
                              <Input
                                value={field.value[ticket - 1]?.first_name}
                                onChange={(e) =>
                                  field.onChange(
                                    field.value.map((item, i) =>
                                      i === ticket - 1
                                        ? { ...field.value[ticket - 1], first_name: e.currentTarget.value }
                                        : item
                                    )
                                  )
                                }
                                type="text"
                              />

                              <FormLabel>Efternavn</FormLabel>

                              <Input type="text" />
                            </div>

                            {/* <div className="flex flex-col sm:flex-row gap-3">
                              <div className="flex-1">
                                <FormField
                                  control={formObject.control}
                                  name="telephone"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Telefon</FormLabel>
                                      <FormControl>
                                        <Input
                                          {...field}
                                          type="tel"
                                          className="max-w-[65%] sm:max-w-full"
                                          onChange={(e) => field.onChange(Number(e.currentTarget.value))}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <div className="flex-[2]">
                                <FormField
                                  control={formObject.control}
                                  name="email"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Email</FormLabel>
                                      <FormControl>
                                        <Input type="email" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div> */}
                          </fieldset>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </FormItem>
            )}
          />
        </div>

        <div className="mt-8 mb-10 flex gap-3 items-center">
          <Checkbox id="newsletter" />

          <div className="flex flex-col leading-none">
            <label
              htmlFor="newsletter"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Jeg ønsker at modtage nyhedsbrev fra Foo Festival
            </label>
          </div>
        </div>

        <Button disabled={formObject.formState.isValid} variant="accent" className="self-end" type="submit">
          Til betaling
        </Button>
      </form>
    </Form>
  );
};

{
  /* <>
<div className="flex flex-col sm:flex-row gap-3 *:flex-1">
  <FormField
    control={formObject.control}
    name="first_name"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Fornavn</FormLabel>
        <FormControl>
          <Input type="text" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />

  <FormField
    control={formObject.control}
    name="last_name"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Efternavn</FormLabel>
        <FormControl>
          <Input type="text" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</div>

<div className="flex flex-col sm:flex-row gap-3">
  <div className="flex-1">
    <FormField
      control={formObject.control}
      name="telephone"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Telefon</FormLabel>
          <FormControl>
            <Input
              {...field}
              type="tel"
              className="max-w-[65%] sm:max-w-full"
              onChange={(e) => field.onChange(Number(e.currentTarget.value))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>

  <div className="flex-[2]">
    <FormField
      control={formObject.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
</div>
</> */
}
