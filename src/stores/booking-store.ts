import { create } from "zustand";

type BookingAddons = {
  greenCamping: boolean;
  chairs: number;
  pavillons: number;
  smallTents: number;
  mediumTents: number;
  largeTents: number;
};

type PaymentInfo = {
  cardholder_name: string;
  card_number: any;
  expiration: string;
  cvc: any;
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

  paymentInfo: PaymentInfo;
  setPaymentInfo: (newValue: PaymentInfo) => void;
};

export const useBookingStore = create<BookingState>((set) => ({
  // Tickets
  totalTickets: 2,
  totalVipTickets: 2,
  area: "Nilfheim",
  setTotalTickets: (newAmount) => set((state) => ({ ...state, totalTickets: newAmount })),
  setTotalVipTickets: (newAmount) => set((state) => ({ ...state, totalVipTickets: newAmount })),
  setArea: (newValue) => set(() => ({ area: newValue })),

  addons: {
    greenCamping: false,
    chairs: 2,
    pavillons: 2,
    smallTents: 0,
    mediumTents: 2,
    largeTents: 0,
  },
  setAddons: (newAddons) => set((state) => ({ ...state, addons: newAddons })),

  paymentInfo: {
    cardholder_name: "Navn på kort",
    card_number: 1245123412451236,
    expiration: "12/25",
    cvc: 133,
  },
  setPaymentInfo: (newValue) => set((state) => ({ ...state, paymentInfo: newValue })),
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
