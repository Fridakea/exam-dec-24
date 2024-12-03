import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import { LandingPage } from "./ui/pages/landing-page";
import { SchedulePage } from "./ui/pages/schedule-page";
import { Layout } from "./ui/pages/layout";
import { PaymentPage } from "./ui/pages/payment-page";

export enum ERoutes {
  HOME = "/",
  SCHEDULE = "/schedule",
  PAYMENT = "/payment",
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path={ERoutes.HOME} element={<LandingPage />} />
          <Route path={ERoutes.SCHEDULE} element={<SchedulePage />} />
        </Route>

        <Route path={ERoutes.PAYMENT} element={<PaymentPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
