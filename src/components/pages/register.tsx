import { RegisSchema } from '@/schema/register-schema';
import { PostService } from '@/services/service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Logo } from '../ui/logo';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

export const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisSchema>({
    resolver: zodResolver(RegisSchema),
  });

  const onSubmit = async (data: RegisSchema) => {
    try {
      const { confirm, ...payload } = data;
      console.log({ payload });
      const r = await PostService('auth/register', payload);
      toast.success('Register Success');
      navigate('/login');
      return r;
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <div className='sm-container mx-auto flex min-h-screen w-full flex-wrap'>
      <div className='flex-center mx-auto min-h-screen w-full basis-1/2 lg:min-h-0'>
        <div className=''>
          <div className='mb-5 flex items-center'>
            <Logo className='text-primary-300' />
            <span className={`ml-2 text-[32px] font-extrabold text-black`}>
              Booky
            </span>
          </div>
          <h1 className='text-[28px] font-extrabold'>Register</h1>
          <p className='mb-5 text-[16px] font-medium'>
            Create your account to start borrowing books.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Label className='text-sm' htmlFor='name'>
              Name
            </Label>
            <Input id='name' {...register('name')} className='my-2' />
            {errors.name && (
              <p className='text-sm font-bold text-red-500'>
                {errors.name.message}
              </p>
            )}
            <Label className='text-sm' htmlFor='email'>
              Email
            </Label>
            <Input id='email' {...register('email')} className='my-2' />
            {errors.email && (
              <p className='text-sm font-bold text-red-500'>
                {errors.email.message}
              </p>
            )}
            <Label className='text-sm' htmlFor='password'>
              Password
            </Label>
            <Input id='password' {...register('password')} className='my-2' />
            {errors.password && (
              <p className='text-sm font-bold text-red-500'>
                {errors.password.message}
              </p>
            )}
            <Label className='text-sm' htmlFor='confirm'>
              Confirm Password
            </Label>
            <Input id='confirm' {...register('confirm')} className='my-2' />
            {errors.confirm && (
              <p className='text-sm font-bold text-red-500'>
                {errors.confirm.message}
              </p>
            )}
            <Button
              className='h-12 w-full rounded-full py-2'
              type='submit'
              variant={'secondary'}
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
