import { Link, Outlet } from "react-router-dom";
import { ERoutes } from "@/main";
import { Logo } from "@/assets/img/logo-export";
import { useDateCountdown } from "@/hooks/use-date-countdown";
import { twMerge } from "tailwind-merge";

export const TicketFlowLayout = () => {
  const { minutes, seconds } = useDateCountdown(0);

  return (
    <div>
      <header className="w-full bg-card shadow-xl">
        <nav className="max-w-screen mx-auto px-4 mb-4 sm:max-w-[1200px] text-card-foreground flex justify-between items-center">
          <Link to={ERoutes.HOME}>
            <div className="flex gap-2 items-center">
              <Logo className="w-24 sm:w-32 transition-all hover:text-accent" />
              <h2 className="hidden sm:block font-nova-cut">Foo festival 2025</h2>
            </div>
          </Link>
          <h3>15-21 juli</h3>
        </nav>
      </header>
      <main className="max-w-screen mx-auto p-4 sm:max-w-[1200px]">
        <div className="mb-6">
          {/* seconds > 0 && */}
          {
            <p className="w-full text-center flex items-center justify-center gap-2">
              Tid til at gennemføre
              <span className={twMerge(minutes <= 1 ? "text-destructive" : "", "~text-lg/xl font-bold")}>
                {minutes}:{seconds}
              </span>
            </p>
          }
        </div>
        <Outlet />
      </main>
    </div>
  );
};
