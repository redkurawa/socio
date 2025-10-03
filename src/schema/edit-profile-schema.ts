import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(1),
  username: z.string().min(1),
  phone: z.string().min(8),
  bio: z.string().nullable(),
  avatar: z
    .union([z.instanceof(File), z.string().url().nullable(), z.literal(null)])
    .optional(),
  // avatarUrl: z.string().url().nullable().optional(),
  avatarUrl: z.string().url().or(z.literal('')).or(z.null()).optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
