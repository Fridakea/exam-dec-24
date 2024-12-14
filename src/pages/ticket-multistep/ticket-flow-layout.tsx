import { Link, Outlet } from "react-router-dom";
import { ERoutes } from "@/main";
import { Logo } from "@/assets/img/logo-export";

export const TicketFlowLayout = () => {
  return (
    <div>
      <header className="max-w-screen mx-auto px-4 mb-10 sm:max-w-[1200px] bg-card text-card-foreground shadow-xl">
        <nav className="flex justify-between items-center">
          <Link to={ERoutes.HOME}>
            <div className="flex gap-2 items-center">
              <Logo className="w-24 sm:w-32 transition-all hover:text-accent" />
              <h2 className="hidden sm:block font-nova-cut">Foo festival 2025</h2>
            </div>
          </Link>
          <h3>15-21 juli</h3>
        </nav>
      </header>
      <main className="max-w-screen  mx-auto p-4 sm:max-w-[1200px]">
        <Outlet />
      </main>
    </div>
  );
};
