import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { AddPostSchema, type AddPostFormType } from '@/schema/add-post-schema';
import { PostService } from '@/services/service';
import { socioStore } from '@/store/user';
import { useEffect } from 'react';

export default function AddPost() {
  const user = socioStore((s) => s.authData);
  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    // setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddPostFormType>({
    resolver: zodResolver(AddPostSchema),
  });

  const ImageUrl = watch('imageUrl');

  const onSubmit = async (data: AddPostFormType) => {
    if (!user?.token) {
      return;
    }
    try {
      const r = await PostService('posts', data, user.token);
      console.log(r);
      toast.success('Post added successfully!');
      reset();
    } catch (err) {
      toast.error('Failed to add book');
    }
  };

  return (
    <>
      <div>Welkome : {user?.user.name}</div>
      <div className='mx-auto flex min-h-[calc(100vh-464px)] max-w-132.25 items-center justify-center'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mx-auto max-w-xl space-y-2'
        >
          <div>
            <Label className='text-sm font-bold'>caption</Label>
            <Input {...register('caption')} />
            {errors.caption && (
              <p className='text-sm text-red-500'>{errors.caption.message}</p>
            )}
          </div>

          <div className='text-sm font-bold'>
            <Label>Cover Image (URL or Upload)</Label>
            <Input {...register('imageUrl')} placeholder='https://...' />
            {errors.imageUrl && (
              <p className='text-sm text-red-500'>{errors.imageUrl.message}</p>
            )}
            {ImageUrl && (
              <img
                src={ImageUrl}
                alt='Preview'
                className='mt-2 max-h-48 rounded-md'
              />
            )}
          </div>

          <Button
            type='submit'
            className='w-full'
            variant={'secondary'}
            // size={'md'}
          >
            Add Book
          </Button>
        </form>
      </div>
    </>
  );
}
