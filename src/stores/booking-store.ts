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
  totalTickets: 2,
  totalVipTickets: 1,
  area: "Nilfheim",
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
