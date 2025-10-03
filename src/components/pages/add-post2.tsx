import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type FieldError } from 'react-hook-form';
import { postSchema } from '@/schema/post-schema';
import { PostMulti } from '@/services/service';
import { socioStore } from '@/store/user';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

type PostFormData = z.infer<typeof postSchema>;

export default function PostForm() {
  const user = socioStore((s) => s.authData);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const watchedImage = watch('image');
  const watchedCaption = watch('caption');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (watchedImage && watchedImage instanceof File) {
      const file = watchedImage;
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [watchedImage]);

  const onSubmit = async (data: PostFormData) => {
    const file = data.image[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('caption', data.caption);

    try {
      await PostMulti('posts', formData, user?.token);
      // alert('Berhasil posting!');
      toast.success('Post added successfully!');
      reset();
      setPreviewUrl(null);
    } catch (e: any) {
      console.error('Gagal posting:', e);
      alert('Terjadi kesalahan saat posting.');
      const msg = e?.response?.data?.message || 'Register failed';
      toast.error(msg);
    }
  };

  useEffect(() => {
    const fileList = watchedImage;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [watchedImage]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mx-auto w-1/2 space-y-4'>
      <div>
        <label>Caption</label>
        <input
          type='text'
          {...register('caption')}
          className='w-full border p-2'
        />
        {errors.caption && (
          <p className='text-red-500'>{errors.caption.message}</p>
        )}
        {watchedCaption && (
          <p className='text-sm text-gray-500'>Preview: {watchedCaption}</p>
        )}
      </div>

      <div>
        <label>Gambar</label>
        <input
          type='file'
          accept='image/*'
          {...register('image')}
          className='w-full border p-2'
        />
        {/* {errors.image && <p className='text-red-500'>{errors.image.message}</p>} */}
        {(errors.image as FieldError | undefined)?.message && (
          <p className='text-red-500'>{(errors.image as FieldError).message}</p>
        )}
        {previewUrl && (
          <img
            src={previewUrl}
            alt='Preview'
            className='mt-2 max-w-xs rounded'
          />
        )}
      </div>

      <button
        type='submit'
        className='rounded bg-blue-500 px-4 py-2 text-white'
      >
        Upload
      </button>
    </form>
  );
}
