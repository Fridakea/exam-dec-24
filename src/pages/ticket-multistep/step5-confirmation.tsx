import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { ERoutes } from "@/main";
import { BasketSection } from "@/components/BasketSection";
import { useBookingStore } from "@/stores/booking-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";

export const Step5ConfirmationPage = () => {
  const navigate = useNavigate();

  const { paymentInfo, setPaymentInfo } = useBookingStore();
  const { cardholder_name, card_number, expiration, cvc } = paymentInfo;

  const [edit, setEdit] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(e);
    navigate(`${ERoutes.BUY_TICKET}/6`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h1 className="mb-8">Din Bestilling</h1>

      <section className="flex flex-col sm:flex-row *:flex-1 gap-10">
        <div className="relative p-8 mb-8 bg-secondary rounded-2xl text-secondary-foreground -z-10">
          <BasketSection />
        </div>

        <div>
          <fieldset disabled={!edit}>
            <legend>Betalingsoplysninger</legend>
            <Label htmlFor="name">Kortholders navn</Label>
            <Input type="text" id="name" value={cardholder_name}></Input>

            <Label htmlFor="card">Kortnummer</Label>
            <Input type="number" id="card" value={card_number}></Input>

            <Label htmlFor="expire">Udløbsdato (MM/ÅÅ)</Label>
            <Input type="text" id="expire" value={expiration}></Input>

            <Label htmlFor="cvc">CVC</Label>
            <Input type="number" id="cvc" value={cvc}></Input>
          </fieldset>

          <div className="flex gap-1 justify-between flex-wrap">
            <Button variant="default" disabled={edit} className="self-end" type="button" onClick={() => setEdit(!edit)}>
              Rediger oplysninger
            </Button>
            <Button variant="accent" disabled={!edit} className="self-end" type="button" onClick={() => setEdit(!edit)}>
              Gem Ændringer
            </Button>
          </div>
        </div>
      </section>

      <Button size="lg" variant="accent" className="self-end" type="submit">
        Gennemfør køb
      </Button>
    </form>
  );
};
