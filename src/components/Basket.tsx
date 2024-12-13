import { useState } from "react";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useBookingStore } from "@/stores/booking-store";

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
import { DottedLine } from "./DottedLine";

export function Basket() {
  const { totalTickets, totalVipTickets, area } = useBookingStore();

  // Calculate total sum and formating as DKK link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
  const calcSum = totalVipTickets * 1299 + totalTickets * 799;
  const moneyFormatter = new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
    minimumFractionDigits: 0,
  });
  const totalSum = moneyFormatter.format(calcSum);

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
          <p>{totalSum}</p>
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
          <p>I ALT: {totalSum}</p>
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
            {totalVipTickets > 0 && (
              <>
                <div className="py-5 px-[10%] flex justify-between items-center relative uppercase">
                  <TicketIcon className="w-full h-full object-contain absolute top-0 left-0 -z-10" />
                  <div>
                    <h2 className="flex items-center gap-2">
                      <span className="text-accent font-bold text-xl">VIP</span> Partout Billet
                    </h2>
                    <p className="text-sm text-muted-foreground">799 kr</p>
                  </div>
                  <p>x {totalVipTickets}</p>
                </div>
                <DottedLine />
              </>
            )}

            {totalTickets > 0 && (
              <>
                <div className="py-5 px-[10%] flex justify-between items-center relative uppercase">
                  <TicketIcon className="w-full h-full object-contain absolute top-0 left-0 -z-10" />
                  <div>
                    <h2>Partout Billet</h2>
                    <p className="text-sm text-muted-foreground">799 kr</p>
                  </div>
                  <p>x {totalTickets}</p>
                </div>
                <DottedLine />
              </>
            )}

            {area.length > 0 && (
              <>
                <div className="py-5 px-[10%] items-center relative uppercase">
                  <TicketIcon className="w-full h-full object-contain absolute top-0 left-0 -z-10" />
                  <h2>Camping Reservation</h2>
                  <p className="text-base text-accent">{area}</p>
                  <p className="text-sm text-muted-foreground">799 kr</p>
                </div>
                <DottedLine />
              </>
            )}
          </section>
        </div>

        <DrawerFooter>
          <div className="flex justify-between uppercase">
            <h3>I alt</h3>
            <p>{totalSum}</p>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
