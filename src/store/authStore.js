import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  hasCheckedAuth: false,

  login: (user) => {
    set({ user, isAuthenticated: true, hasCheckedAuth: true });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, hasCheckedAuth: true });
  },

  syncAuth: (user) => {
    if (user) {
      set({ user, isAuthenticated: true, hasCheckedAuth: true });
    } else {
      set({ user: null, isAuthenticated: false, hasCheckedAuth: true });
    }
  },
}));

export default useAuthStore;
