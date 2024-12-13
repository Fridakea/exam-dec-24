import { FormEventHandler } from "react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { ERoutes } from "@/main";
import { BasketSection } from "@/components/BasketSection";

export const Step5ConfirmationPage = () => {
  const navigate = useNavigate();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(e);
    navigate(`${ERoutes.BUY_TICKET}/6`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h1>Din Bestilling</h1>
      <BasketSection />

      <Button variant="accent" className="self-end" type="submit">
        Gennemfør køb
      </Button>
    </form>
  );
};
