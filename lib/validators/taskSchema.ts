import { z } from 'zod';

export const taskSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(20, { message: 'Task name must be at most 20 characters' }),
  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .max(30, { message: 'Description must be at most 30 characters' }),
  image: z
    .string()
    .refine((val) => !val || val.startsWith('http://') || val.startsWith('https://'), {
      message: 'Image URL must start with http:// or https://',
    }),
  status: z.enum(['pending', 'in_progress', 'completed'], {
    message: 'Status must be one of pending, in_progress, or completed',
  }),
  priority: z.enum(['low', 'medium', 'high'], {
    message: 'Priority must be one of low, medium, or high',
  }),
  is_completed: z.enum(['true', 'false'], {
    message: 'is_completed must be either true or false',
  }),
  due_date: z.string().min(1, {
    message: 'Due date is required',
  }),
});

export type TaskFormData = z.infer<typeof taskSchema>;
