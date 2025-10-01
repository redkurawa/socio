import { z } from 'zod';

export const AddPostSchema = z.object({
  caption: z.string().min(1, 'Caption is required'),
  imageUrl: z.string().url().or(z.string().min(1, 'Image is required')),
});

export type AddPostFormType = z.infer<typeof AddPostSchema>;
