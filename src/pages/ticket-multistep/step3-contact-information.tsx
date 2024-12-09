import { FormEventHandler } from "react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { ERoutes } from "@/main";

export const Step3ContactInformationPage = () => {
  const navigate = useNavigate();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(e);
    navigate(`${ERoutes.BUY_TICKET}/4`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Kontaktoplysninger</h1>
      <Button type="submit">Til betaling</Button>
    </form>
  );
};
