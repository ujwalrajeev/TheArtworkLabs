import { create } from "zustand";
import type { User } from "firebase/auth";

type AuthStore = {
  isLoggedIn: boolean;
  user: User | null;
  setIsLoggedIn: (value: boolean) => void;
  setUser: (user: User | null) => void;
};

// Create a Zustand store for authentication state
export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  user: null,

  setIsLoggedIn: (value: boolean) =>
    set({
      isLoggedIn: value,
    }),

  setUser: (user: User | null) =>
    set({
      user: user,
    }),
}));
