import { FormEventHandler } from "react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { ERoutes } from "@/main";

export const Step4PaymentInformationPage = () => {
  const navigate = useNavigate();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(e);
    navigate(`${ERoutes.BUY_TICKET}/5`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Betalingsoplysninger</h1>
      <Button type="submit">Se overblik</Button>
    </form>
  );
};
