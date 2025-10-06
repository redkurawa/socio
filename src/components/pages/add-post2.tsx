import { postSchema } from '@/schema/post-schema';
import { PostService } from '@/services/service';
import { authStore } from '@/store/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { Header } from '../layouts/header';
import { Loading } from '../layouts/loading';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

type PostFormData = z.infer<typeof postSchema>;

export default function PostForm() {
  const [loading, setLoading] = useState(false);

  const user = authStore((s) => s.authData);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
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
    console.log('🧪 Form submitted with data:', data);
    const file = data.image[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('caption', data.caption);
    setLoading(true);
    try {
      await PostService('posts', formData, user?.token);
      // await PostMulti('posts', formData, user?.token);
      // alert('Berhasil posting!');
      toast.success('Post added successfully!');
      reset();
      setPreviewUrl(null);
      setLoading(true);
    } catch (e: any) {
      console.error('Gagal posting:', e);
      alert('Terjadi kesalahan saat posting.');
      const msg = e?.response?.data?.message || 'Posting failed';
      toast.error(msg);
    } finally {
      setLoading(false);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      console.log('🖼️ Preview URL set:', url);
      setPreviewUrl(url);
    } else {
      console.warn('⚠️ No file selected');
    }
  };

  const handleRemoveImage = () => {
    console.log('❌ Removing image');
    setPreviewUrl(null);
    setValue('image', null);
  };

  return (
    <>
      <Header />
      <div className='mx-auto mt-10 w-full max-w-113'>
        <Link to='/timeline'>
          <h1 className='flex items-center gap-3'>
            <ArrowLeft className='size-8 text-white' />
            <span className='text-2xl font-bold'>Add Post</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-6 space-y-4'>
          <div
            className='relative w-full overflow-hidden rounded-xl border border-dashed border-neutral-800 bg-neutral-900/80 text-center'
            style={{
              aspectRatio: '3 / 2',
              maxHeight: '50vh',
              // maxWidth: '50vw',
              backgroundImage: previewUrl ? `url(${previewUrl})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <input
              type='file'
              accept='image/*'
              // {...register('image')}
              {...register('image', {
                onChange: (e) => {
                  console.log('📦 File selected:', e.target.files?.[0]);
                  handleImageChange(e);
                },
              })}
              id='image-upload'
              className='hidden'
              // onChange={handleImageChange}
            />

            <label
              htmlFor='image-upload'
              className={`flex h-full w-full cursor-pointer flex-col items-center justify-center py-6 transition ${
                previewUrl ? 'bg-cover bg-center bg-no-repeat' : ''
              }`}
              style={
                previewUrl ? { backgroundImage: `url(${previewUrl})` } : {}
              }
            >
              {!previewUrl && (
                <>
                  <span className='font-semibold text-purple-400'>
                    Click to upload
                  </span>
                  <span className='text-sm text-neutral-400'>
                    or drag and drop
                  </span>
                </>
              )}
            </label>

            {previewUrl && (
              <button
                type='button'
                onClick={handleRemoveImage}
                className='absolute top-2 right-2 rounded-full bg-black/60 p-1 text-white transition hover:bg-black/80'
                aria-label='Remove image'
              >
                &times;
              </button>
            )}
          </div>

          <div>
            <Label className='text-sm'>Caption</Label>
            <Textarea
              // type='text'
              {...register('caption')}
              className='min-h-[5rem] w-full resize-none rounded-xl border border-neutral-800 bg-neutral-900/80 p-2'
              placeholder='Create your caption'
              rows={5}
            />
            {errors.caption && (
              <p className='text-red-500'>{errors.caption.message}</p>
            )}
            {watchedCaption && (
              <p className='text-sm text-gray-500'>Preview: {watchedCaption}</p>
            )}
          </div>

          <Button type='submit' variant={'secondary'}>
            Upload
          </Button>
        </form>
      </div>
      {loading && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <Loading loading={loading} />
        </div>
      )}
    </>
  );
}
