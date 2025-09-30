import { z } from 'zod';

export const RegisSchema = z
  .object({
    name: z.string(),
    email: z.string().email('Format email tidak valid'),
    password: z
      .string()
      .min(6, { message: 'Kata sandi harus minimal 6 karakter.' }),
    confirm: z
      .string()
      .min(6, { message: 'Kata sandi harus minimal 6 karakter.' }),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Passwords do not match',
    path: ['confirm'],
  });

export type RegisSchema = z.infer<typeof RegisSchema>;
