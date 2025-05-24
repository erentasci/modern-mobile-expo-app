import { create } from 'zustand';

import { getAllLists } from '@/queries/lists';
import { List } from '@/types';

export interface ListState {
  lists: List[];
  setLists: (newLists: List[]) => void;
  fetchLists: () => Promise<void>;
}

export const useListStore = create<ListState>((set) => ({
  lists: [],
  setLists: (newLists: List[]) => set({ lists: newLists }),
  fetchLists: async () => {
    const response = await getAllLists();
    try {
      if (response) {
        set({ lists: response });
      } else {
        console.error('Failed to fetch lists');
      }
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  },
}));
