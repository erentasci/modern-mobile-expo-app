import { create } from 'zustand';

import { createList, getAllLists, getListById } from '@/queries/lists';
import { List } from '@/types';

export interface ListState {
  lists: List[];
  setLists: (newLists: List[]) => void;
  fetchLists: () => Promise<void>;
  createNewList: (name: string) => Promise<{ success: boolean; message?: string } | undefined>;
  getListById: (id: number) => Promise<List | undefined>;
}

export const useListStore = create<ListState>((set) => ({
  lists: [],
  setLists: (newLists: List[]) => set({ lists: newLists }),
  fetchLists: async () => {
    try {
      const response = await getAllLists();

      if (response) {
        set({ lists: response });
      } else {
        console.error('Failed to fetch lists');
      }
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  },
  createNewList: async (name: string) => {
    const response = await createList(name);
    if (response.changes) {
      const currentTime = new Date().toISOString();
      const newList: List = {
        id: response.lastInsertRowId,
        name,
        created_at: currentTime,
        updated_at: currentTime,
      };
      set((state) => ({ lists: [...state.lists, newList] }));
      return {
        success: true,
        message: 'List created successfully',
      };
    } else {
      return {
        success: false,
        message: 'Failed to create list',
      };
    }
  },
  getListById: async (id: number) => {
    try {
      const response = await getListById(id);
      if (response) {
        console.log('List fetched successfully:', response);
        return response;
      }
    } catch (error) {
      console.error('Error fetching list by ID:', error);
    }
  },
}));
