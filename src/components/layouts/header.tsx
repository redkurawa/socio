// src/components/header/header.tsx
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
import SearchUsers from './search-users';

export const Header = () => {
  const user = authStore((s) => s.authData);

  return (
    <div className='h-20 border-b border-neutral-800 px-1'>
      <div className='sm-container flex h-20 items-center justify-between px-1 md:px-0'>
        {/* kiri: logo */}
        <Link to='/'>
          <div className='flex items-center gap-2'>
            <Logo className='' />
            <h1 className='text-[32px] font-extrabold'>Sociality</h1>
          </div>
        </Link>

        {/* tengah: search (hanya tampil >= sm) */}
        <div className='hidden flex-1 justify-center sm:flex'>
          <SearchUsers className='mx-4' />
        </div>

        {/* kanan: auth / menu + aturan responsif ikon search */}
        {user?.token ? (
          <div className='flex items-center gap-3'>
            {/* <sm: hanya ikon kaca pembesar di samping avatar */}
            <div className='sm:hidden'>
              <SearchUsers mobile />
            </div>

            {user.user.avatarUrl ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild className='cursor-pointer'>
                  <div className='flex items-center gap-3'>
                    <img
                      src={user.user.avatarUrl}
                      alt=''
                      className='size-12 rounded-full'
                    />
                    <div className='hidden sm:block'>{user.user.name}</div>
                  </div>
                </DropdownMenuTrigger>
                <DropDownUserMenu />
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild className='cursor-pointer'>
                  <div className='flex items-center gap-3'>
                    <div className='size-16 rounded-full bg-neutral-800' />
                    <div className='hidden sm:block'>{user.user.name}</div>
                  </div>
                </DropdownMenuTrigger>
                <DropDownUserMenu />
              </DropdownMenu>
            )}
          </div>
        ) : (
          <>
            {/* <sm: hanya ikon search + hamburger */}
            <div className='flex items-center gap-2 sm:hidden'>
              <SearchUsers mobile />
              <Sheet>
                <SheetTrigger>
                  <Menu />
                </SheetTrigger>
                <SheetContent side='top' className='w-full bg-black/10'>
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

            {/* >=sm: tombol login/register penuh */}
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
          </>
        )}
      </div>
    </div>
  );
};
