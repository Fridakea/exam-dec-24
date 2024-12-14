import { FormEventHandler } from "react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { ERoutes } from "@/main";
import { BasketSection } from "@/components/BasketSection";
import { useBookingStore } from "@/stores/booking-store";

export const Step5ConfirmationPage = () => {
  const navigate = useNavigate();

  const { paymentInfo } = useBookingStore();
  const { cardholder_name, card_number, expiration, cvc } = paymentInfo;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(e);
    navigate(`${ERoutes.BUY_TICKET}/6`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h1 className="mb-8">Din Bestilling</h1>

      <section className="flex flex-col sm:flex-row sm:*:w-[50%] gap-2 sm:gap-12">
        <div className="relative p-8 mb-8 bg-secondary rounded-2xl text-secondary-foreground -z-10">
          <BasketSection />
        </div>

        <div>
          <div>
            <h2 className="mb-5">Betalingsoplysninger</h2>

            <h3 className="font-medium text-popover-foreground">Kortholders navn:</h3>
            <p className="mb-2">{cardholder_name}</p>

            <h3>Kortnummer:</h3>
            <p className="mb-2">{card_number}</p>

            <h3>Udløbsdato:</h3>
            <p className="mb-2">{expiration}</p>

            <h3>CVC:</h3>
            <p className="mb-2">{cvc}</p>

            <Button
              variant="default"
              className="self-end"
              type="button"
              onClick={() => navigate(`${ERoutes.BUY_TICKET}/4`)}
            >
              Rediger oplysninger
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
