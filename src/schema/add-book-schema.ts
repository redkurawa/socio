import { z } from 'zod';

export const AddBookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  isbn: z.string().min(10, 'ISBN must be at least 10 characters'),
  publishedYear: z.coerce.number().min(1000).max(new Date().getFullYear()),
  coverImage: z.string().url().or(z.string().min(1, 'Image is required')),
  authorId: z.coerce.number().min(1, 'Author is required'),
  categoryId: z.coerce.number().min(1, 'Category is required'),
  totalCopies: z.coerce.number().min(1),
  availableCopies: z.coerce.number().min(0),
});

export type AddBookFormType = z.infer<typeof AddBookSchema>;
