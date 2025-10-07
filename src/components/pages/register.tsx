import { RegisSchema } from '@/schema/register-schema';
import { PostService } from '@/services/service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { FormField } from '../layouts/form-register-field';
import { Button } from '../ui/button';
import { Logo } from '../ui/logo';

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
    } catch (e: any) {
      console.error({ e });
      const msg = e?.response?.data?.message || 'Register failed';
      toast.error(msg);
    }
  };

  return (
    <>
      <div className="mx-auto flex min-h-svh w-full items-center justify-center bg-black bg-[url('/images/Init.jpg')] bg-cover bg-center bg-no-repeat">
        <div className='w-full max-w-[523px] rounded-2xl border border-neutral-900 px-6 py-10 text-white'>
          <div className='mb-5 flex items-center justify-center'>
            <Logo className='size-[30px] text-white' />
            <span className='ml-2 text-center text-2xl font-extrabold'>
              Sociality
            </span>
          </div>
          <h1 className='text-center text-2xl font-extrabold'>Register</h1>
          <div>
            {/* <form onSubmit={handleSubmit(onSubmit)}>
              <Label className='text-sm text-white' htmlFor='name'>
                Name
              </Label>
              <Input
                id='name'
                {...register('name')}
                className='custom-input text-white'
                placeholder='Enter your name'
              />
              {errors.name && (
                <p className='text-sm font-bold text-red-500'>
                  {errors.name.message}
                </p>
              )}

              <Label className='text-sm text-white' htmlFor='username'>
                Username
              </Label>
              <Input
                id='username'
                {...register('username')}
                className='custom-input'
                placeholder='Enter your username'
              />
              {errors.username && (
                <p className='text-sm font-bold text-red-500'>
                  {errors.username.message}
                </p>
              )}

              <div className='mb-5'>
                <Label className='text-sm text-white' htmlFor='email'>
                  Email
                </Label>
                <Input
                  id='email'
                  {...register('email')}
                  className='custom-input'
                  placeholder='Enter your email'
                />
                {errors.email && (
                  <p className='text-sm text-red-500'>{errors.email.message}</p>
                )}
              </div>

              <Label className='text-sm text-white' htmlFor='phone'>
                Number Phone
              </Label>
              <Input
                id='phone'
                {...register('phone')}
                className='custom-input'
                placeholder='Enter your number phone'
              />
              {errors.phone && (
                <p className='text-sm font-bold text-red-500'>
                  {errors.phone.message}
                </p>
              )}

              <Label className='text-sm text-white' htmlFor='password'>
                Password
              </Label>
              <Input
                id='password'
                {...register('password')}
                className='custom-input'
                placeholder='Enter your password'
              />
              {errors.password && (
                <p className='text-sm font-bold text-red-500'>
                  {errors.password.message}
                </p>
              )}
              <Label className='text-sm text-white' htmlFor='confirm'>
                Confirm Password
              </Label>
              <Input
                id='confirm'
                {...register('confirm')}
                className='custom-input'
                placeholder='Enter your confirm password'
              />
              {errors.confirm && (
                <p className='text-sm font-bold text-red-500'>
                  {errors.confirm.message}
                </p>
              )}
              <Button
                className='my-5 w-full rounded-full'
                type='submit'
                variant={'secondary'}
              >
                Submit
              </Button>
              <div>Already have an account? Log in</div>
            </form> */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormField
                id='name'
                label='Name'
                placeholder='Enter your name'
                register={register}
                error={errors.name}
                className='text-white'
              />
              <FormField
                id='username'
                label='Username'
                placeholder='Enter your username'
                register={register}
                error={errors.username}
              />
              <FormField
                id='email'
                label='Email'
                placeholder='Enter your email'
                register={register}
                error={errors.email}
              />
              <FormField
                id='phone'
                label='Number Phone'
                placeholder='Enter your number phone'
                register={register}
                error={errors.phone}
              />
              <FormField
                id='password'
                label='Password'
                placeholder='Enter your password'
                register={register}
                error={errors.password}
                type='password'
              />
              <FormField
                id='confirm'
                label='Confirm Password'
                placeholder='Enter your confirm password'
                register={register}
                error={errors.confirm}
                type='password'
              />
              <Button
                className='my-5 w-full rounded-full'
                type='submit'
                variant='secondary'
              >
                Submit
              </Button>
              <div>
                Already have an account?{' '}
                <Link to='/login'>
                  <span className='text-primary-300'>Log in</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
