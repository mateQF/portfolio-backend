import { z } from 'zod';

export const IdParamSchema = z.object({
  id: z.uuid('El ID no es un UUID válido')
});
