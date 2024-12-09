import { ERoutes } from "@/main";
import { useNavigate } from "react-router";

export const Step6ReceiptPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Tak for din bestilling!</h1>
      <button onClick={() => navigate(ERoutes.SCHEDULE)}>Se programmet</button>
      <button onClick={() => navigate(ERoutes.HOME)}>Til forsiden</button>
    </div>
  );
};
