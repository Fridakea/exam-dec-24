import { stat } from "fs";
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

  getTotalPrice: () => number;

  paymentInfo: PaymentInfo;
  setPaymentInfo: (newValue: PaymentInfo) => void;
};

export const useBookingStore = create<BookingState>((set, get) => ({
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

  getTotalPrice: () => {
    const { totalTickets, totalVipTickets, area, addons } = get();
    let basePrice = addons.greenCamping ? 249 : 0;
    basePrice = area.length > 0 ? 99 : 0;
    return (
      basePrice +
      totalVipTickets * 1299 +
      totalTickets * 799 +
      addons.chairs * 79 +
      addons.pavillons * 149 +
      addons.smallTents * 199 +
      addons.mediumTents * 299 +
      addons.largeTents * 399
    );
  },

  paymentInfo: {
    cardholder_name: "",
    card_number: undefined,
    expiration: "",
    cvc: undefined,
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
