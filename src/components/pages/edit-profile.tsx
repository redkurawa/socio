import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
// import { profileSchema } from './schema';
import {
  profileSchema,
  type ProfileFormValues,
} from '@/schema/edit-profile-schema';
import { GetService, PatchMulti } from '@/services/service';
import { authStore } from '@/store/user';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function EditProfile() {
  const user = authStore((s) => s.authData);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    // formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      username: '',
      phone: '',
      bio: '',
      avatar: null,
      avatarUrl: '',
    },
  });
  // console.log('errors', errors);

  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      const r = await GetService('me', user?.token);
      // setProfile()
      // console.log(r.data.profile);
      setValue('name', r.data.profile.name);
      setValue('username', r.data.profile.username);
      setValue('phone', r.data.profile.phone);
      setValue('bio', r.data.profile.bio ?? '');
      setValue('avatarUrl', r.data.profile.avatarUrl ?? '');
      setPreview(r.data.profile.avatarUrl ?? null);
    }
    fetchProfile();
  }, [user?.token, setValue]);

  const avatarWatch = watch('avatar');

  useEffect(() => {
    if (avatarWatch instanceof File) {
      const url = URL.createObjectURL(avatarWatch);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else if (typeof avatarWatch === 'string') {
      setPreview(avatarWatch);
    }
  }, [avatarWatch]);

  const onSubmit = async (data: ProfileFormValues) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('username', data.username);
    formData.append('phone', data.phone);
    formData.append('bio', data.bio ?? '');
    if (data.avatar instanceof File) {
      formData.append('avatar', data.avatar);
      formData.append('avatarUrl', '');
    } else if (typeof data.avatar === 'string') {
      formData.append('avatar', '');
      formData.append('avatarUrl', data.avatar);
    } else {
      formData.append('avatar', '');
      formData.append('avatarUrl', '');
    }
    // console.log(user?.token, formData);
    try {
      await PatchMulti('me', formData, user?.token);
      toast.success('Edit profile successfully!');
      // reset();
    } catch (e: any) {
      console.error('Gagal edit:', e);
      alert('Terjadi kesalahan saat posting edit.');
      const msg = e?.response?.data?.message || 'Register failed';
      toast.error(msg);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 border p-10'>
        <div className='flex'>
          <div>
            <div>
              <Label>Avatar (File or URL)</Label>
              <Input
                type='file'
                accept='image/*'
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setValue('avatar', file);
                }}
                className='border'
              />
              <Input
                type='url'
                className='border'
                placeholder='http://avatar.url'
                onBlur={(e) => {
                  const url = e.target.value;
                  if (url) setValue('avatar', url);
                }}
              />
              {preview && (
                <img
                  src={preview}
                  alt='Avatar Preview'
                  className='h-24 w-24 rounded-full'
                />
              )}
            </div>
          </div>
          <div>
            <div>
              <Input
                {...register('name')}
                placeholder='Name'
                className='border'
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>

            <div>
              <Input
                {...register('username')}
                placeholder='Username'
                className='border'
              />
              {errors.username && <p>{errors.username.message}</p>}
            </div>

            <div>
              <Input
                {...register('phone')}
                placeholder='Phone'
                className='border'
              />
              {errors.phone && <p>{errors.phone.message}</p>}
            </div>
            <div>
              <textarea
                {...register('bio')}
                placeholder='Bio'
                className='border'
              />
              {errors.bio && <p>{errors.bio.message}</p>}
            </div>
          </div>
        </div>

        <Button type='submit' variant={'secondary'}>
          Update Profile
        </Button>
      </form>
    </>
  );
}
