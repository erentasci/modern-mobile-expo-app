import { z } from 'zod';

export const taskSchema = z.object({
  name: z.string().min(1, { message: 'Task name is required' }),
  description: z.string().optional(),
  image: z.string().optional(),
  status: z.enum(['pending', 'in_progress', 'completed']).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  is_completed: z.string().optional(),
  due_date: z.string().optional(),
});

export type TaskFormData = z.infer<typeof taskSchema>;
