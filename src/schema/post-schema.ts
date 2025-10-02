// validationSchema.ts
// import { z } from 'zod';

// export const postSchema = z.object({
//   caption: z.string().min(1, 'Caption wajib diisi'),
//   image: z.custom<File>((val) => val instanceof File, {
//     message: 'File gambar wajib diunggah',
//   }),
// });

import { z } from 'zod';

export const postSchema = z.object({
  caption: z.string().min(1, 'Caption wajib diisi'),
  image: z
    .any()
    .refine((fileList) => fileList instanceof FileList && fileList.length > 0, {
      message: 'File gambar wajib diunggah',
    }),
});
