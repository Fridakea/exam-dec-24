import { FormEventHandler } from "react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { ERoutes } from "@/main";

export const Step2BuyAddonsPage = () => {
  const navigate = useNavigate();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(e);
    navigate(`${ERoutes.BUY_TICKET}/3`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Tilkøb</h1>
      <Button type="submit">Næste</Button>
    </form>
  );
};
