import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,

  login: (data) => {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data.user));

    set({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      user: data.user,
    });
  },

  logout: () => {
    localStorage.clear();

    set({
      accessToken: null,
      refreshToken: null,
      user: null,
    });
  },
}));

export default useAuthStore;