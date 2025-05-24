import { z } from 'zod';

export const listSchema = z.object({
  name: z.string().min(1, 'Name is required').max(30, 'Name must be less than 30 characters'),
});

export type ListFormData = z.infer<typeof listSchema>;
