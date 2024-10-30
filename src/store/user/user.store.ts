import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
interface UserState {
  user: any;
}

interface UserAction {
  setUser: (user: any) => void;
}

export const useUserStore = create<UserState & UserAction>()(
  persist(
    (set) => ({
      user: {} as any,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
