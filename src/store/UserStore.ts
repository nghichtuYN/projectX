import { create } from "zustand";
import axios from "@/lib/axios";

type AuthState = {
  user?: { name: string; email: string; id: string } | null;
  isAuthenticated: boolean;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: { name: string; email: string; id: string } | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => {
    console.log(user)
    set({ user: user });
  },
  fetchUser: async () => {
    try {
      const res = await axios.get("/me"); // 🔹 Gọi API lấy thông tin user
      set({ user: res.data, isAuthenticated: true });
    } catch {
      set({ user: null, isAuthenticated: false });
    }
  },

  logout: async () => {
    await axios.post("/logout");
    set({ user: null, isAuthenticated: false });
  },
}));
