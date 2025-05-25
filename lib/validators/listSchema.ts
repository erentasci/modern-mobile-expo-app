import { z } from 'zod';

export const listSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(1, {
      message: 'Name is required',
    })
    .max(20, {
      message: 'List name must be at most 20 characters',
    }),
});

export type ListFormData = z.infer<typeof listSchema>;
