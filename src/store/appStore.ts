import { create } from 'zustand';
import { StudyCycle, Notification } from '@/types';

interface AppStore {
  cycles: StudyCycle[];
  activeCycle: StudyCycle | null;
  notifications: Notification[];
  setCycles: (cycles: StudyCycle[]) => void;
  setActiveCycle: (cycle: StudyCycle | null) => void;
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (id: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  cycles: [],
  activeCycle: null,
  notifications: [],
  setCycles: (cycles) => set({ cycles }),
  setActiveCycle: (activeCycle) => set({ activeCycle }),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),
  markNotificationAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
    })),
}));
