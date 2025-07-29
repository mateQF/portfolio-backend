import { z } from 'zod';

export const ProjectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  image: z.url('Image must be a valid URL'),
  url: z.url('Project URL must be valid'),
  techStack: z.array(z.string().min(1, 'Each tech must be a non-empty string')),
  category: z.string().min(3, 'Category must be at least 3 characters'),
  isFeatured: z.boolean().optional()
});
