import { LoginSchema } from '@/schema/login-schema';
import { PostService } from '@/services/service';
import { socioStore } from '@/store/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Logo } from '../ui/logo';

export const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const addAuthData = socioStore((s) => s.addAuthData);
  const onSubmit = async (data: LoginSchema) => {
    try {
      const r = await PostService('auth/login', data);
      // console.log('token :', r.data);
      addAuthData(r.data.data);
      toast.success('Login success');
      navigate('/timeline');
    } catch (e: any) {}

    const r = await PostService('auth/login', data);
    // console.log('token :', r.data);
    addAuthData(r.data.data);
  };

  // const authData = socioStore((s) => s.authData);
  // // useEffect(() => {
  // //   if (authData) {
  // //     console.log(authData);
  // //   }
  // // }, [authData]);

  return (
    <>
      <div className="mx-auto flex min-h-svh w-full items-center justify-center bg-black bg-[url('/images/Init.jpg')] bg-cover bg-center bg-no-repeat">
        <div className='w-full max-w-111.5 rounded-2xl border border-neutral-800 px-6 pb-10 text-white'>
          <div className='flex flex-col items-center text-2xl font-bold'>
            <div className='flex items-center pt-10'>
              <Logo className='size-[30px]' />
              <span className={`ml-2`}>Sociality</span>
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
                {...register('email')}
                className='custom-input'
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
              <Input
                id='password'
                {...register('password')}
                className='custom-input'
              />
              {errors.password && (
                <p className='text-accent-red text-sm'>
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button
              className='mb-4 h-12 w-full rounded-full py-2'
              type='submit'
              // disabled={isLoading}
              variant={'secondary'}
            >
              {/* {isLoading ? (
                <span className='flex items-center gap-2'>
                  <Loader2 className='size-8 animate-spin text-red-100' />
                  Loading...
                </span>
              ) : (
                'Login'
              )} */}
              Login
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
