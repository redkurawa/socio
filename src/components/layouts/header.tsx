import { authStore } from '@/store/user';
import { Menu } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Logo } from '../ui/logo';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { DropDownUserMenu } from './dropdown-user';

export const Header = () => {
  const user = authStore((s) => s.authData);
  // useEffect(() => {
  //   if (user) {
  //     console.log(user);
  //   }
  // }, [user]);

  return (
    <div className='h-20 border-b px-1'>
      <div className='sm-container flex h-20 items-center justify-between px-1 md:px-0'>
        <Link to='/'>
          <div className='flex items-center gap-2'>
            <Logo className='' />
            <h1 className='text-[32px] font-extrabold'>Sociality</h1>
          </div>
        </Link>
        {user?.token ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild className='cursor-pointer'>
              <div className='flex items-center gap-3'>
                {user.user.avatarUrl ? (
                  <img
                    src={user.user.avatarUrl}
                    alt=''
                    className='size-12 rounded-full'
                  />
                ) : (
                  <div className='size-16 rounded-full bg-neutral-800'></div>
                )}
                {user.user.name}
              </div>
            </DropdownMenuTrigger>
            <DropDownUserMenu />
          </DropdownMenu>
        ) : (
          <>
            <div className='text-md hidden items-center gap-4 md:flex'>
              <Button className='cursor-pointer' variant={'outline'}>
                <Link to='/login'>Login</Link>
              </Button>
              <Button
                className='cursor-pointer hover:bg-neutral-200/30'
                variant={'secondary'}
              >
                <Link to='/register'>Register</Link>
              </Button>
            </div>
            <div className='md:hidden'>
              <Sheet>
                <SheetTrigger>
                  <Menu />
                </SheetTrigger>
                <SheetContent side='top' className='w-full'>
                  <SheetHeader>
                    <SheetTitle></SheetTitle>
                    <SheetDescription></SheetDescription>
                  </SheetHeader>
                  <div className='text-md flex justify-around gap-4 p-5'>
                    <Button className='cursor-pointer' variant={'outline'}>
                      <Link to='/login'>Login</Link>
                    </Button>
                    <Button
                      className='cursor-pointer hover:bg-neutral-200/30'
                      variant={'secondary'}
                    >
                      <Link to='/register'>Register</Link>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
