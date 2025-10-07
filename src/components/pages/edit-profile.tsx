import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { Header } from '../layouts/header';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export default function EditProfile() {
  const user = authStore((s) => s.authData);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormValues>({
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

  const [preview, setPreview] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      const r = await GetService('me', user?.token);
      setValue('name', r.data.profile.name);
      setValue('username', r.data.profile.username);
      setValue('username', r.data.profile.username);
      setValue('phone', r.data.profile.phone);
      setValue('bio', r.data.profile.bio ?? '');
      setValue('avatarUrl', r.data.profile.avatarUrl ?? '');
      setPreview(r.data.profile.avatarUrl ?? null);
      setEmail(r.data.profile.email);
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
    try {
      await PatchMulti('me', formData, user?.token);
      toast.success('Edit profile successfully!');
    } catch (e: any) {
      console.error('Gagal edit:', e);
      const msg = e?.response?.data?.message || 'Edit failed';
      toast.error(msg);
    }
  };

  return (
    <>
      <Header />
      <div className='w-full bg-black'>
        <div className='mx-auto w-full max-w-4xl px-6 pt-10'>
          <Link to='/timeline'>
            <div className='flex items-center gap-3'>
              <ArrowLeft className='size-8 text-white' />
              <span className='text-2xl font-bold'>Back</span>
            </div>
          </Link>
        </div>
        <div className='mx-auto w-full max-w-4xl px-6 py-8'>
          {/* Title */}
          <h1 className='mb-6 text-2xl font-semibold text-white'>
            Edit Profile
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
            {/* Grid: avatar kiri, form kanan */}
            <div className='grid grid-cols-1 gap-8 md:grid-cols-[220px_minmax(0,1fr)]'>
              {/* Left: Avatar + Change Photo */}
              <div className='flex flex-col items-start'>
                <div className='h-24 w-24 overflow-hidden rounded-full bg-neutral-200'>
                  {preview ? (
                    <img
                      src={preview}
                      alt='Avatar Preview'
                      className='h-full w-full object-cover'
                    />
                  ) : null}
                </div>

                <div className='mt-4'>
                  <label className='inline-flex'>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setValue('avatar', file);
                      }}
                      className='hidden'
                    />
                    <span className='bg-primary-300 border-primary-200 cursor-pointer rounded-full border px-4 py-2 text-sm text-white shadow-sm'>
                      Change Photo
                    </span>
                  </label>
                </div>

                {/* URL input tersembunyi sesuai logika lama, tidak tampil di UI desain */}
                <Input
                  type='url'
                  className='mt-4 hidden'
                  placeholder='http://avatar.url'
                  onBlur={(e) => {
                    const url = e.target.value;
                    if (url) setValue('avatar', url);
                  }}
                />
              </div>

              {/* Right: Fields */}
              <div className='space-y-6'>
                {/* Name */}
                <div className='space-y-2'>
                  <Label className='text-sm text-white'>Name</Label>
                  <Input
                    {...register('name')}
                    placeholder='John Doe'
                    className='custom-input h-11 rounded-xl border focus-visible:ring-0'
                  />
                  {errors.name && (
                    <p className='text-sm text-red-500'>
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Username */}
                <div className='space-y-2'>
                  <Label className='text-sm text-white'>Username</Label>
                  <Input
                    {...register('username')}
                    placeholder='johndoe'
                    className='custom-input h-11 rounded-xl border focus-visible:ring-0'
                  />
                  {errors.username && (
                    <p className='text-sm text-red-500'>
                      {errors.username.message}
                    </p>
                  )}
                </div>

                {/* Email (read-only bila tidak ada di schema, tetap UI saja) */}
                <div className='space-y-2'>
                  <Label className='text-sm text-white'>Email</Label>
                  <Input
                    name='email'
                    type='email'
                    value={email}
                    readOnly
                    placeholder='johndoe@email.com'
                    className='custom-input h-11 cursor-not-allowed rounded-xl border focus-visible:ring-0'
                  />
                </div>

                {/* Phone */}
                <div className='space-y-2'>
                  <Label className='text-sm text-white'>Number Phone</Label>
                  <Input
                    {...register('phone')}
                    placeholder='091234567890'
                    className='custom-input h-11 rounded-xl border focus-visible:ring-0'
                  />
                  {errors.phone && (
                    <p className='text-sm text-red-500'>
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Bio */}
                <div className='space-y-2'>
                  <Label className='text-sm text-white'>Bio</Label>
                  <textarea
                    {...register('bio')}
                    rows={4}
                    placeholder='Creating unforgettable moments with my favorite person! 📸✨ Let’s cherish every second together!'
                    className='custom-input w-full rounded-xl border p-3 focus:ring-0 focus:outline-none'
                  />
                  {errors.bio && (
                    <p className='text-sm text-red-500'>{errors.bio.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className='pt-2'>
              <Button
                type='submit'
                className='h-12 w-full rounded-2xl bg-gradient-to-r from-[#6a5cff] to-[#6a00ff] text-base text-white shadow-md hover:opacity-95'
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
