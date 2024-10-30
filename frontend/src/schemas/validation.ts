import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const taskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']),
});