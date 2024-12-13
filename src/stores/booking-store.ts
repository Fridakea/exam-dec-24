import { create } from "zustand";

type BookingAddons = {
  greenCamping: boolean;
  chairs: number;
  pavillons: number;
  smallTents: number;
  mediumTents: number;
  largeTents: number;
};

type BookingState = {
  totalTickets: number;
  totalVipTickets: number;
  area: string;
  setTotalTickets: (newAmount: number) => void;
  setTotalVipTickets: (newAmount: number) => void;
  setArea: (newValue: string) => void;

  addons: BookingAddons;
  setAddons: (newAddons: BookingAddons) => void;
};

export const useBookingStore = create<BookingState>((set) => ({
  // Tickets
  totalTickets: 0,
  totalVipTickets: 0,
  area: "",
  setTotalTickets: (newAmount) => set((state) => ({ ...state, totalTickets: newAmount })),
  setTotalVipTickets: (newAmount) => set((state) => ({ ...state, totalVipTickets: newAmount })),
  setArea: (newValue) => set(() => ({ area: newValue })),

  addons: {
    greenCamping: false,
    chairs: 0,
    pavillons: 0,
    smallTents: 0,
    mediumTents: 0,
    largeTents: 0,
  },
  setAddons: (newAddons) => set((state) => ({ ...state, addons: newAddons })),
}));

// Calculate total sum and formating as DKK link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
// const calcSum = greenCamping
//   ? 249
//   : 0 +
//     totalVipTickets * 1299 +
//     totalTickets * 799 +
//     99 +
//     chairs * 79 +
//     pavillons * 149 +
//     smallTents * 199 +
//     mediumTents * 299 +
//     largeTents * 399;
// const moneyFormatter = new Intl.NumberFormat("da-DK", {
//   style: "currency",
//   currency: "DKK",
//   minimumFractionDigits: 0,
// });
// const totalSum = moneyFormatter.format(calcSum);
