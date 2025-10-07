import { LoginSchema } from '@/schema/login-schema';
import { PostService } from '@/services/service';
import { authStore } from '@/store/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Logo } from '../ui/logo';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState } from 'react';

export const Login = () => {
  const navigate = useNavigate();

  // UI state tambahan (TIDAK mengubah logic)
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const addAuthData = authStore((s) => s.addAuthData);

  const onSubmit = async (data: LoginSchema) => {
    // loading UI mulai
    setIsLoading(true);
    try {
      const r = await PostService('auth/login', data);
      addAuthData(r.data.data);
      toast.success('Login success');
      navigate('/timeline');
    } catch (e: any) {
      console.error({ e });
      toast.error('Email not found or Password not match');
    } finally {
      // loading UI selesai
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mx-auto flex min-h-svh w-full items-center justify-center bg-black bg-[url('/images/Init.jpg')] bg-cover bg-center bg-no-repeat">
        <div className='w-full max-w-111.5 rounded-2xl border border-neutral-800 bg-black/40 px-6 pb-10 text-white backdrop-blur-sm'>
          <div className='flex flex-col items-center text-2xl font-bold'>
            <div className='flex items-center pt-10'>
              <Logo className='size-[30px]' />
              <span className='ml-2'>Sociality</span>
            </div>
            <p className='my-6'>Welcome Back!</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-5'>
              <Label className='text-sm font-bold' htmlFor='email'>
                Email
              </Label>
              <Input
                id='email'
                autoComplete='email'
                disabled={isLoading}
                {...register('email')}
                className='custom-input'
                placeholder='you@example.com'
              />
              {errors.email && (
                <p className='text-accent-red text-sm'>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className='mb-5'>
              <Label className='text-sm font-bold' htmlFor='password'>
                Password
              </Label>

              <div className='relative'>
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  autoComplete='current-password'
                  disabled={isLoading}
                  {...register('password')}
                  className='custom-input pr-12'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={
                    showPassword ? 'Sembunyikan password' : 'Tampilkan password'
                  }
                  className='absolute inset-y-0 right-2 flex items-center rounded-md px-2 hover:bg-white/5 focus:ring-2 focus:ring-white/30 focus:outline-none'
                >
                  {showPassword ? (
                    <EyeOff className='h-5 w-5' />
                  ) : (
                    <Eye className='h-5 w-5' />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className='text-accent-red text-sm'>
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              className='mb-4 h-12 w-full rounded-full py-2'
              type='submit'
              variant='secondary'
              disabled={isLoading}
            >
              {isLoading ? (
                <span className='flex items-center justify-center gap-2'>
                  <Loader2 className='h-5 w-5 animate-spin' />
                  Loading...
                </span>
              ) : (
                'Login'
              )}
            </Button>

            <div className='text-md text-center font-semibold'>
              Don't have an account?
              <span className='text-primary-200 cursor-pointer'>
                <Link to='/register'> Register</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
