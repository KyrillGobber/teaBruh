import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Tea, teas } from '../constants';

interface TeaState {
    tea: Tea;
    allTeas: Tea[];
    setTea: (newTea: Tea) => void;
    setAllTeas: (newTeas: Tea[]) => void;
}

export const useTeaStore = create<TeaState>()(
    persist(
        (set) => ({
            // Initial State
            tea: teas[0],
            allTeas: teas,
            //Methods
            setTea: (newTea: Tea) => set({ tea: newTea }),
            setAllTeas: (newTeas: Tea[]) => set({ allTeas: newTeas }),
        }),
        {
            name: 'tea-store',
        }
    )
);
