import { create } from "zustand";

type BookingState = {
  totalTickets: number;
  totalVipTickets: number;
  setTotalTickets: (newAmount: number) => void;
  setTotalVipTickets: (newAmount: number) => void;

  totalChairs: number;
  totalPavillons: number;
  totalSmallTents: number;
  totalMediumTents: number;
  totalLargeTents: number;
  setGreenCamping: () => void;
  setTotalChairs: (newAmount: number) => void;
  setTotalPavillons: (newAmount: number) => void;
  setTotalSmallTents: (newAmount: number) => void;
  setTotalMediumTents: (newAmount: number) => void;
  setTotalLargeTents: (newAmount: number) => void;
};

export const useBookingStore = create<BookingState>((set) => ({
  // Tickets
  totalTickets: 2,
  totalVipTickets: 1,
  setTotalTickets: (newAmount) => set((state) => ({ ...state, totalTickets: newAmount })),
  setTotalVipTickets: (newAmount) => set((state) => ({ ...state, totalVipTickets: newAmount })),

  // Add on's
  greenCamping: false,
  totalChairs: 0,
  totalPavillons: 0,
  totalSmallTents: 0,
  totalMediumTents: 0,
  totalLargeTents: 0,
  setGreenCamping: () => !false,
  setTotalChairs: (newAmount) => set((state) => ({ ...state, totalChairs: newAmount })),
  setTotalPavillons: (newAmount) => set((state) => ({ ...state, totalPavillons: newAmount })),
  setTotalSmallTents: (newAmount) => set((state) => ({ ...state, totalSmallTents: newAmount })),
  setTotalMediumTents: (newAmount) => set((state) => ({ ...state, totalMediumTents: newAmount })),
  setTotalLargeTents: (newAmount) => set((state) => ({ ...state, totalLargeTents: newAmount })),
}));
