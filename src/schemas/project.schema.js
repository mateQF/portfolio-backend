import { z } from 'zod';

export const ProjectSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  image: z.url(),
  url: z.url(),
  techStack: z.array(z.string().min(1)),
  category: z.string().min(3),
  isFeatured: z.boolean().optional()
});
