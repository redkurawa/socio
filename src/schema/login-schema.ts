import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z
    .string()
    .min(6, { message: 'Kata sandi harus minimal 6 karakter.' }),
});

export type LoginSchema = z.infer<typeof LoginSchema>;
