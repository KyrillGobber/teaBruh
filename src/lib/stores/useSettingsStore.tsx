import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
    pretimer: number
    setPretimer: (pretimer: number) => void;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            // Initial State
            pretimer: 0,
            //Methods
            setPretimer: (pretimer: number) => set({ pretimer: pretimer }),
        }),
        {
            name: 'settings-store',
        }
    )
);
