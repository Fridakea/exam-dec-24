import { FC, ReactElement, useState } from "react";
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
import { twMerge } from "tailwind-merge";

export function Basket() {
  const { totalTickets, totalVipTickets, area, addons } = useBookingStore();

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
            {totalVipTickets <= 0 && totalTickets <= 0 && area.length <= 0 && (
              <div>
                <p>Ingenting i kurven</p>
              </div>
            )}

            {totalVipTickets > 0 && (
              <TicketItem price={1299} amount={totalVipTickets}>
                <h2 className="flex items-center gap-2">
                  <span className="text-accent font-bold text-xl">VIP</span> Partout Billet
                </h2>
              </TicketItem>
            )}

            {totalTickets > 0 && (
              <TicketItem price={799} amount={totalTickets}>
                <h2 className="flex items-center gap-2">Partout Billet</h2>
              </TicketItem>
            )}

            {area.length > 0 && (
              <TicketItem price={799}>
                <>
                  <h2 className="flex items-center gap-2">Camping Reservation</h2>
                  <p className="text-base text-accent">{area}</p>
                </>
              </TicketItem>
            )}

            {addons.greenCamping && (
              <TicketItem price={249} className="bg-green">
                <>
                  <h2 className="flex items-center gap-2">Green Camping</h2>
                  <p className="text-sm text-muted-foreground">
                    Modtag kun genanvendeligt og miljøbevist festival gear
                  </p>
                </>
              </TicketItem>
            )}

            {addons.chairs > 0 && (
              <TicketItem price={79} amount={addons.chairs}>
                <h2 className="flex items-center gap-2">Festivalstol m. kopholder</h2>
              </TicketItem>
            )}

            {addons.pavillons > 0 && (
              <TicketItem price={149} amount={addons.pavillons}>
                <h2 className="flex items-center gap-2">Festival pavillon</h2>
              </TicketItem>
            )}

            {addons.smallTents > 0 && (
              <TicketItem price={199} amount={addons.smallTents}>
                <h2 className="flex items-center gap-2">1 personers telt</h2>
              </TicketItem>
            )}

            {addons.mediumTents > 0 && (
              <TicketItem price={299} amount={addons.mediumTents}>
                <h2 className="flex items-center gap-2">2 personers telt</h2>
              </TicketItem>
            )}

            {addons.largeTents > 0 && (
              <TicketItem price={399} amount={addons.largeTents}>
                <h2 className="flex items-center gap-2">3 personers telt</h2>
              </TicketItem>
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

type TicketItemProps = {
  price: number;
  amount?: number;
  className?: string;
  children?: ReactElement;
};

const TicketItem: FC<TicketItemProps> = ({ price, amount = 0, className = "", children }) => (
  <>
    <div className={twMerge(className, "py-5 px-[10%] flex justify-between items-center relative uppercase")}>
      <TicketIcon className="w-full h-full object-contain absolute top-0 left-0 -z-10" />
      <div>
        {children}
        <p className="text-sm text-muted-foreground">{price} kr</p>
      </div>
      {amount > 0 && <p>x {amount}</p>}
    </div>
    <DottedLine />
  </>
);
