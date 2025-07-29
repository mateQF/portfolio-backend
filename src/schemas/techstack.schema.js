import { z } from 'zod';

export const TechStackSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.enum(['frontend', 'backend', 'database', 'tooling', 'orm', 'testing', 'language'], {
    required_error: 'Category is required'
  })
});
