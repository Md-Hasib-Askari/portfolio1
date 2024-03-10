import {create} from "zustand";

export const useUserStore = create((set) => ({
    user: {
        status: "",
    },
    setUser: (user) => {
        set({user});
    },
    logout: () => set({user: {status: ""}}),
}));