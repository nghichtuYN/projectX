import { getUser, signOut } from "@/services/user";
import { create } from "zustand";
export type User = {
  fullName: string;
  email: string;
  id: string | "1111111111111";
  phoneNumber: string;
  profilePicture: string;
  role?: string;
};
type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
  loadUser: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user: user });
  },
  loadUser: async () => {
    try {
      const res = await getUser();
      set({ user: res });
    } catch (error) {
      set({ user: null });
    }
  },
  logout: async () => {
    try {
      const res = await signOut();
      set({ user: null });
    } catch (error) {
      set({ user: null });
    }
  },
}));
