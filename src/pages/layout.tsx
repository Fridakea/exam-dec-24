import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { ERoutes } from "@/main.tsx";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Menu } from "lucide-react";
import { Logo } from "@/assets/img/logo-export";
// import { Button } from "@/components/ui/button";

export const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const navigate = useNavigate();

  return (
    <>
      <header className="pt-5 pb-10 px-4 max-w-[1200px] mx-auto flex flex-row items-center justify-between">
        <Link to={ERoutes.HOME} onClick={() => setIsMenuOpen(false)}>
          <div className="flex gap-2 items-center">
            <Logo className="w-24 sm:w-32 transition-all hover:text-accent" />
            {/* <h2 className="hidden sm:block font-nova-cut">Foo festival 2025</h2> */}
          </div>
        </Link>

        <Sheet open={isMenuOpen} onOpenChange={(open) => setIsMenuOpen(open)}>
          <SheetTrigger>
            <Menu className="h-12 w-12 stroke-1 transition-all hover:text-accent" />
          </SheetTrigger>

          <SheetContent>
            <DialogTitle hidden>Menu</DialogTitle>
            <DialogDescription hidden>Her vises menu underpunkterne</DialogDescription>
            <nav className="flex flex-col items-center gap-16 sm:gap-32 tracking-widest font-medium uppercase">
              <Link to={ERoutes.HOME} onClick={() => setIsMenuOpen(false)}>
                <Logo className="w-48 sm:w-56 pt-10 sm:pt-20 transition-all hover:text-accent" />
              </Link>
              <Link to={ERoutes.SCHEDULE} onClick={() => setIsMenuOpen(false)}>
                <h2 className="transition-all hover:text-accent">Program</h2>
              </Link>
              <Link to={ERoutes.BUY_TICKET} onClick={() => setIsMenuOpen(false)}>
                <h2 className="transition-all hover:text-accent">Køb billet</h2>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </header>

      <main className="max-w-[1200px] mx-auto px-6">
        <Outlet />
      </main>

      {/* <footer className="mt-20 mb-10">
        <div className="max-w-[1200px] px-8 flex flex-col items-center sm:flex-row justify-between">
          <h4 className="mb-5 text-xl font-semibold sm:hidden">Foo Festival</h4>

          <div className="mb-5">
            <h5>Kontakt os</h5>
            <p className="mb-4">info@foofestival.dk</p>

            <h5>Adresse</h5>
            <p>Roskilde parkvej 1, 4000 Roskilde</p>
          </div>

          <div className="flex flex-col">
            <h4 className="hidden sm:inline-block mb-8 text-2xl font-semibold text-right">Foo Festival</h4>
            <Button size="lg" variant="accent" onClick={() => navigate(`${ERoutes.BUY_TICKET}`)}>
              Køb billet
            </Button>
          </div>
        </div>
      </footer> */}
    </>
  );
};
