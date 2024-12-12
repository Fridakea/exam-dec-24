import { create } from "zustand";

type BookingState = {
  totalTickets: number;
  setTotalTickets: (newAmount: number) => void;
};

export const useBookingStore = create<BookingState>((set) => ({
  totalTickets: 0,
  setTotalTickets: (newAmount) => set((state) => ({ ...state, totalTickets: newAmount })),
}));
