import { useState } from "react";
import { useIsMobile } from "@/hooks/use-is-mobile";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { TicketIcon } from "@/assets/icons";

export function Basket() {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <section className="w-full h-full p-10 bg-secondary rounded-2xl text-secondary-foreground flex flex-col justify-between">
        <div>
          <h2 className="~text-2xl/3xl">Min kurv på PC</h2>
        </div>

        <div className="flex justify-between">
          <h3>I alt</h3>
          <p>Total beløb Kr</p>
        </div>
      </section>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="w-full h-fit -mx-4 p-4 fixed bottom-0 rounded-none rounded-t-lg flex justify-between"
        >
          <p>Pil op</p>
          <p>I ALT: total beløb KR</p>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-4 h-screen rounded-none flex flex-col justify-between">
        <div>
          <DrawerClose asChild>
            <Button
              variant="outline"
              className="w-full h-fit p-4 absolute top-0 left-0 rounded-none flex justify-between"
            >
              <p>Pil ned</p>
              <p>Luk</p>
            </Button>
          </DrawerClose>

          <DrawerHeader className="mt-5 -ml-4 text-left">
            <DrawerTitle>Min kurv</DrawerTitle>
            <DrawerDescription hidden>Her vises de ting du har produkter til kurven</DrawerDescription>
          </DrawerHeader>

          <section>
            <div className="h-full w-full py-5 px-10 bg-[url('src/assets/images/ticket-background.webp')] bg-cover bg-center flex justify-between items-center">
              <div>
                <h2>Type køb</h2>
                <p>Pris kr</p>
              </div>
              <p>x 1</p>
            </div>

            <div className="py-5 px-10 flex justify-between items-center relative">
              <TicketIcon className="w-full h-full absolute top-0 left-0 p-0 -z-10" />
              <div className="text-red-600">
                <h2>Type køb</h2>
                <p>Pris kr</p>
              </div>
              <p>x 1</p>
            </div>
          </section>
        </div>

        <DrawerFooter>
          <div className="flex justify-between uppercase">
            <h3>I alt</h3>
            <p>Total beløb Kr</p>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
