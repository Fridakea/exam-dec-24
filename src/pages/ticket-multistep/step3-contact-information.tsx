import { useNavigate } from "react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ERoutes } from "@/main";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useBookingStore } from "@/stores/booking-store";

const formSchema = z.object({
  contact_info: z.array(
    z.object({
      first_name: z.string().min(2, "Fornavnet skal være mindst 2 bogstaver"),
      last_name: z.string().min(2, "Efternavnet skal være mindst 2 bogstaver"),
      telephone: z.string().min(8, "Et telefon nummer er minimum 8 cifre"),
      email: z.string().email("Ugyldig email"),
    })
  ),
});

type FormData = z.infer<typeof formSchema>;

export const Step3ContactInformationPage = () => {
  const { totalTickets } = useBookingStore();

  const ticketNumbers = Array.from({ length: totalTickets }, (_, i) => i + 1);

  const navigate = useNavigate();

  const formObject = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contact_info: ticketNumbers.map((_) => ({
        first_name: "",
        last_name: "",
        telephone: "",
        email: "",
      })),
    },
    mode: "onTouched",
  });

  // Makes a new list of contact info where the property is updated
  const getUpdatedContactInfo = (
    propertyName: "first_name" | "last_name" | "telephone" | "email",
    newValue: any,
    ticket: number,
    contactInfo: any[]
  ) => {
    return contactInfo.map((item, i) =>
      i === ticket - 1 ? { ...contactInfo[ticket - 1], [propertyName]: newValue } : item
    );
  };

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
                          <fieldset className="flex flex-col sm:flex-row gap-3 *:flex-1 border border-white">
                            <div>
                              <label>Fornavn</label>
                              <Input
                                value={field.value[ticket - 1]?.first_name}
                                onChange={(e) =>
                                  field.onChange(
                                    getUpdatedContactInfo("first_name", e.currentTarget.value, ticket, field.value)
                                  )
                                }
                                type="text"
                              />
                            </div>

                            <div>
                              <label>Efternavn</label>
                              <Input
                                value={field.value[ticket - 1]?.last_name}
                                onChange={(e) =>
                                  field.onChange(
                                    getUpdatedContactInfo("last_name", e.currentTarget.value, ticket, field.value)
                                  )
                                }
                                type="text"
                              />
                            </div>

                            <div>
                              <label>Telefon</label>
                              <Input
                                value={field.value[ticket - 1]?.telephone}
                                onChange={(e) =>
                                  field.onChange(
                                    getUpdatedContactInfo("telephone", e.currentTarget.value, ticket, field.value)
                                  )
                                }
                                type="tel"
                              />
                            </div>

                            <div>
                              <label>Email</label>
                              <Input
                                value={field.value[ticket - 1]?.email}
                                onChange={(e) =>
                                  field.onChange(
                                    getUpdatedContactInfo("email", e.currentTarget.value, ticket, field.value)
                                  )
                                }
                                type="email"
                              />
                            </div>
                          </fieldset>
                        </FormControl>
                        <FormMessage />
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

        <Button disabled={!formObject.formState.isValid} variant="accent" className="self-end" type="submit">
          Til betaling
        </Button>
      </form>
    </Form>
  );
};
