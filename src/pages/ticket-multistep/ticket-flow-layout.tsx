import { Outlet } from "react-router-dom";

export const TicketFlowLayout = () => {
  return (
    <div>
      <header className="max-w-screen  mx-auto p-4 mb-10 sm:max-w-[1200px] border-b-2 border-foreground">
        <nav className="flex justify-between">
          <div className="h-8 w-8 bg-red-500"></div>
          <h3>15-21 juli</h3>
        </nav>
      </header>
      <main className="max-w-screen  mx-auto p-4 sm:max-w-[1200px]">
        <Outlet />
      </main>
    </div>
  );
};
