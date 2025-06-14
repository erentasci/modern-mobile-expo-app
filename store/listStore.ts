import { create } from 'zustand';

import {
  createList,
  deleteList,
  getAllLists,
  getListById,
  searchListsByName,
  updateList,
} from '@/queries/lists';
import { List } from '@/types';

export interface ListState {
  lists: List[];
  setLists: (newLists: List[]) => void;
  fetchLists: () => Promise<{
    success: boolean;
    message?: string;
  }>;
  createNewList: (name: string) => Promise<{ success: boolean; message?: string }>;
  getList: (id: number) => Promise<List | undefined>;
  deleteListById: (id: number) => Promise<{ success: boolean; message?: string }>;
  updateListById: (id: number, name: string) => Promise<{ success: boolean; message?: string }>;
  getListByTerm: (searchTerm: string) => Promise<List[] | undefined>;
}
export const useListStore = create<ListState>((set) => ({
  lists: [],
  setLists: (newLists: List[]) => set({ lists: newLists }),
  fetchLists: async () => {
    try {
      const response = await getAllLists();
      if (response) {
        set({ lists: response });
        return { success: true, message: 'Lists fetched successfully' };
      } else {
        console.error('Failed to fetch lists');
        return { success: false, message: 'Failed to fetch lists' };
      }
    } catch {
      return { success: false, message: 'An unexpected error occurred while fetching lists' };
    }
  },
  createNewList: async (name: string) => {
    try {
      const response = await createList(name);
      if (response.changes > 0) {
        const currentTime = new Date().toISOString();
        const newList: List = {
          id: response.lastInsertRowId,
          name,
          created_at: currentTime,
          updated_at: currentTime,
        };
        set((state) => ({ lists: [...state.lists, newList] }));
        return { success: true, message: 'New List created successfully' };
      } else {
        return { success: false, message: 'Failed to create a new list' };
      }
    } catch {
      return { success: false, message: 'An unexpected error occurred while creating a new list' };
    }
  },
  getList: async (id: number) => {
    try {
      const response = await getListById(id);
      return response;
    } catch (error) {
      console.error('Error fetching list by ID:', error);
    }
  },
  deleteListById: async (id: number) => {
    try {
      const response = await deleteList(id);
      if (response.changes > 0) {
        set((state) => ({
          lists: state.lists.filter((list) => list.id !== id),
        }));
        return { success: true, message: 'List deleted successfully' };
      } else {
        return { success: false, message: 'Failed to delete the list' };
      }
    } catch {
      return { success: false, message: 'An unexpected error occurred while deleting the list ' };
    }
  },
  updateListById: async (id: number, name: string) => {
    try {
      const response = await updateList(id, name);
      if (response.changes > 0) {
        const currentTime = new Date().toISOString();
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === id ? { ...list, name, updated_at: currentTime } : list
          ),
        }));
        return { success: true, message: 'List updated successfully' };
      } else {
        return { success: false, message: 'Failed to update the list' };
      }
    } catch {
      return { success: false, message: 'An unexpected error occurred while updating the list' };
    }
  },
  getListByTerm: async (searchTerm: string) => {
    try {
      const response = await searchListsByName(searchTerm);
      if (response) {
        const filteredLists = response.filter((list) =>
          list.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        set({ lists: filteredLists });
      } else {
        console.error('Failed to fetch lists');
        return undefined;
      }
    } catch (error) {
      console.error('An unexpected error occurred while searching for lists:', error);
      return undefined;
    }
  },
}));
