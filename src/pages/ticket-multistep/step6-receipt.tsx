import { ERoutes } from "@/main";
import { useNavigate } from "react-router";

import { TicketIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { BasketSection } from "@/components/BasketSection";

export const Step6ReceiptPage = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col sm:flex-row gap-16 sm:*:w-1/2">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-center">Tak for din bestilling!</h1>

        <div className="w-[90%] py-8 px-8 flex justify-center items-center relative font-medium text-card-foreground tracking-widest text-center">
          <TicketIcon className="w-full h-full object-contain absolute top-0 left-0 -z-10 text-card" />
          <h2>Download biletter</h2>
        </div>

        <Button size="lg" variant="accent" type="button" onClick={() => navigate(ERoutes.SCHEDULE)}>
          Se programmet
        </Button>
        <Button size="lg" variant="accent" type="button" onClick={() => navigate(ERoutes.HOME)}>
          Til forsiden
        </Button>
      </div>

      <div className="relative p-10 bg-secondary rounded-2xl text-secondary-foreground -z-10">
        <h2 className="mb-8">Din kvittering</h2>
        <BasketSection />
      </div>
    </section>
  );
};
