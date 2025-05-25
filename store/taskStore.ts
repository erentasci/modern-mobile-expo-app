import { create } from 'zustand';

import { createTask, deleteTask, getTaskById, getTasksByListId, updateTask } from '@/queries/tasks';
import { Task } from '@/types';

export interface TaskState {
  tasks: Task[];
  setTasks: (newTasks: Task[]) => void;
  createNewTaskById: (
    task: Omit<Task, 'id'>,
    id: number
  ) => Promise<{ success: boolean; message?: string }>;
  fetchTasksByListId: (id: number) => Promise<{ success: boolean; message?: string }>;
  deleteTaskById: (id: number) => Promise<{ success: boolean; message?: string }>;
  editTaskById: (
    id: number,
    task: Omit<Task, 'id'>
  ) => Promise<{ success: boolean; message?: string }>;
  getTaskById: (id: number) => Promise<Task | null>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  setTasks: (newTasks: Task[]) => set({ tasks: newTasks }),
  createNewTaskById: async (task: Omit<Task, 'id'>, id: number) => {
    try {
      const response = await createTask({
        name: task.name,
        description: task.description ?? undefined,
        image: task.image ?? undefined,
        status: task.status ?? undefined,
        priority: task.priority ?? undefined,
        is_completed: task.is_completed ?? undefined,
        due_date: task.due_date ?? undefined,
        list_id: id,
      });
      if (response.changes > 0) {
        const currentTime = new Date().toISOString();
        const newTask: Task = {
          ...task,
          id: response.lastInsertRowId,
          created_at: currentTime,
          updated_at: currentTime,
        };
        set((state) => ({ tasks: [...state.tasks, newTask] }));
        return {
          success: true,
          message: 'Task created successfully',
        };
      } else {
        return {
          success: false,
          message: 'Failed to create task',
        };
      }
    } catch {
      return {
        success: false,
        message: 'An unexpected error occurred while creating a new task',
      };
    }
  },
  fetchTasksByListId: async (id: number) => {
    try {
      const response = await getTasksByListId(id);
      if (response) {
        set({ tasks: response });
        return { success: true, message: 'Tasks fetched successfully' };
      } else {
        console.error('Failed to fetch tasks');
        return { success: false, message: 'Failed to fetch tasks by list Id' };
      }
    } catch {
      return {
        success: false,
        message: 'An unexpected error occurred while fetching tasks by list Id',
      };
    }
  },
  deleteTaskById: async (id: number) => {
    try {
      const response = await deleteTask(id);
      if (response.changes > 0) {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
        return { success: true, message: 'List deleted successfully' };
      } else {
        return { success: false, message: 'Failed to delete the list' };
      }
    } catch {
      return { success: false, message: 'An unexpected error occurred while deleting the list ' };
    }
  },
  editTaskById: async (id: number, task: Omit<Task, 'id'>) => {
    try {
      const response = await updateTask(id, {
        name: task.name,
        description: task.description ?? undefined,
        image: task.image ?? undefined,
        status: task.status ?? undefined,
        priority: task.priority ?? undefined,
        is_completed: task.is_completed ?? undefined,
        due_date: task.due_date ?? undefined,
      });
      if (response.changes > 0) {
        const currentTime = new Date().toISOString();
        const updatedTask: Task = {
          ...task,
          id,
          updated_at: currentTime,
        };
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === id ? updatedTask : task)),
        }));
        return { success: true, message: 'Task updated successfully' };
      } else {
        return { success: false, message: 'Failed to update the task' };
      }
    } catch {
      return { success: false, message: 'An unexpected error occurred while updating the task' };
    }
  },
  getTaskById: async (id: number) => {
    try {
      const response = await getTaskById(id);
      if (response) {
        return response;
      } else {
        console.log('Failed to fetch task by ID');
        return null;
      }
    } catch (error) {
      console.error('An unexpected error occurred while fetching the task by ID:', error);
      return null;
    }
  },
}));
