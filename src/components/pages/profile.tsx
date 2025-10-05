import { GetService } from '@/services/service';
import { authStore } from '@/store/user';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Header } from '../layouts/header';
import type { Profile, Stats } from '@/types/user-profile';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export const UserProfile = () => {
  const [user, setUser] = useState<Profile>();
  const [stat, setStat] = useState<Stats>();
  const userlogin = authStore((s) => s.authData);
  useEffect(() => {
    const getProfile = async () => {
      try {
        const r = await GetService('me', userlogin?.token);
        console.log(r.data);
        setUser(r.data.profile);
        setStat(r.data.stats);
      } catch (e: any) {
        console.error(e);
      }
    };
    getProfile();
  }, []);

  return (
    <>
      <Header />
      <div className='mx-auto w-full max-w-203'>
        <div className='py-10'>
          <Link to='/timeline'>
            <div className='flex items-center gap-3'>
              <ArrowLeft className='size-8 text-white' />
              <span className='text-2xl font-bold'>Back</span>
            </div>
          </Link>
        </div>
        <div className='flex justify-between'>
          <div className='flex items-center gap-3'>
            <div className='size-16 rounded-full'>
              {user?.avatarUrl && (
                <img
                  src={user?.avatarUrl}
                  alt={user?.name}
                  className='size-16 rounded-full'
                />
              )}
            </div>
            <div className='text-sm'>
              <div className='font-bold'>{user?.name}</div>
              <div className='font-normal'>{user?.username}</div>
            </div>
          </div>
          <Button className='cursor-pointer'>Edit Profile</Button>
        </div>
        <div className='py-4'>{user?.bio}</div>
        <div className='flex justify-between pb-4'>
          <div className='flex-1 border-r border-neutral-700 text-center'>
            <div className='text-xl font-bold'>{stat?.posts}</div>
            <div className='text-md font-normal text-neutral-400'>Post</div>
          </div>
          <div className='flex-1 border-r border-neutral-700 text-center'>
            <div className='text-xl font-bold'>{stat?.followers}</div>
            <div className='text-md font-normal text-neutral-400'>
              Followers
            </div>
          </div>
          <div className='flex-1 border-r border-neutral-700 text-center'>
            <div className='text-xl font-bold'>{stat?.following}</div>
            <div className='text-md font-normal text-neutral-400'>
              Following
            </div>
          </div>
          <div className='flex-1 text-center'>
            <div className='text-xl font-bold'>{stat?.likes}</div>
            <div className='text-md font-normal text-neutral-400'>Likes</div>
          </div>
        </div>
        <Tabs defaultValue='gallery' className=''>
          <TabsList className='w-full'>
            <TabsTrigger value='gallery'>Gallery</TabsTrigger>
            <TabsTrigger value='saved'>Saved</TabsTrigger>
          </TabsList>
          <TabsContent value='gallery'>
            Make changes to your account here.
          </TabsContent>
          <TabsContent value='saved'>Change your password here.</TabsContent>
        </Tabs>
      </div>
    </>
  );
};
