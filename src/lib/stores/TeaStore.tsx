import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Tea, teas } from '../constants';

interface TeaState {
    tea: Tea;
    setTea: (newTea: Tea) => void;
}

export const useTeaStore = create<TeaState>()(
    devtools(
        persist(
            (set) => ({
                // Initial State
                tea: teas[0],
                //Methods
                setTea: (newTea: Tea) => set({ tea: newTea }),
            }),
            {
                name: 'tea-store',
            }
        )
    )
);
