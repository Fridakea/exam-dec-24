import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { ERoutes } from "@/main.tsx";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-red-400 p-6">
        <div className="max-w-[1200px] mx-auto flex flex-col items-end">
          <Sheet open={isMenuOpen} onOpenChange={(open) => setIsMenuOpen(open)}>
            <SheetTrigger>Open</SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <nav>
                <Link to={ERoutes.HOME} onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
                <Link
                  to={ERoutes.SCHEDULE}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Schedule
                </Link>
                <Link to={ERoutes.PAYMENT} onClick={() => setIsMenuOpen(false)}>
                  Payment
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
