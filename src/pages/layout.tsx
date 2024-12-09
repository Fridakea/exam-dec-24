import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { ERoutes } from "@/main.tsx";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="p-6">
        <div className="max-w-[1200px] mx-auto flex flex-col items-end">
          <Sheet open={isMenuOpen} onOpenChange={(open) => setIsMenuOpen(open)}>
            <SheetTrigger>Open</SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col gap-10">
                <Link to={ERoutes.HOME} onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
                <Link
                  to={ERoutes.SCHEDULE}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Schedule
                </Link>
                <Link
                  to={ERoutes.BUY_TICKET}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Køb billet
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6">
        <Outlet />
      </main>
    </>
  );
};
