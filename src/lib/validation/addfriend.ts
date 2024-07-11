import { z } from 'zod';

export const AddSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email.' }),
});
