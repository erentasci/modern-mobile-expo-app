import { create } from 'zustand';

import { createTask, getTasksByListId } from '@/queries/tasks';
import { Task } from '@/types';

export interface TaskState {
  tasks: Task[];
  setTasks: (newTasks: Task[]) => void;
  createNewTaskById: (task: Task, id: number) => Promise<{ success: boolean; message?: string }>;
  fetchTasksByListId: (id: number) => Promise<{ success: boolean; message?: string }>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  setTasks: (newTasks: Task[]) => set({ tasks: newTasks }),
  createNewTaskById: async (task: Task, id: number) => {
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
    } catch (error) {
      console.error('Error creating new task:', error);
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
        return { success: false, message: 'Failed to fetch tasks' };
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return { success: false, message: 'An unexpected error occurred while fetching tasks' };
    }
  },
}));
