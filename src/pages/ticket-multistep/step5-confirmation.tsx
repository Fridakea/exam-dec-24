import { FormEventHandler } from "react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { ERoutes } from "@/main";

export const Step5ConfirmationPage = () => {
  const navigate = useNavigate();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(e);
    navigate(`${ERoutes.BUY_TICKET}/6`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Se overblik</h1>
      <Button type="submit">Gennemfør køb</Button>
    </form>
  );
};
