import { getUser, signOut } from "@/services/user";
import { create } from "zustand";

export type User = {
  fullName: string;
  email: string;
  id: string | "1111111111111";
  phoneNumber: string;
  profilePicture: string;
  roles: string[];
  recruiterVerified: boolean;
  verificationSubmitted: boolean;
  emailConfirmed: boolean;
  provider: string;
  xTokenBalance: number;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setAuthenticated: (isAuth: boolean) => void;
  loadUser: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false, // Thêm trạng thái đăng nhập

  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
  },

  setAuthenticated: (isAuth) => {
    set({ isAuthenticated: isAuth });
  },
  logout: async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },
  loadUser: async () => {
    try {
      const res = await getUser();
      set({ user: res, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false });
    }
  },
}));
