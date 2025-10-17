import { create } from "zustand";

interface signOutI {
  isSignOut: boolean;
  turnSignOut: () => void;
  turnSignFalse: () => void;
}

export const useSignOut = create<signOutI>((set) => ({
  isSignOut: false,
  turnSignOut: () => set((state) => ({ ...state, isSignOut: true })),
  turnSignFalse: () => set((state) => ({ ...state, isSignOut: false })),
}));
