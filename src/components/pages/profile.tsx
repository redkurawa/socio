import { GetService } from '@/services/service';
import { authStore } from '@/store/user';
import type { userProfile } from '@/types/profile';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { AuthorImages } from '../layouts/AuthorImages';
import { Header } from '../layouts/header';
import SavedGallery from '../layouts/save-page';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export const UserProfile = () => {
  const [user, setUser] = useState<userProfile>();
  const { username } = useParams();

  const userlogin = authStore((s) => s.authData);
  useEffect(() => {
    const getProfile = async () => {
      console.log('username dari params :', username);
      try {
        const r = await GetService(`users/${username}`, userlogin?.token);
        console.log(r.data);
        setUser(r.data);
      } catch (e: any) {
        console.error(e);
      }
    };
    getProfile();
  }, []);

  useEffect(() => {
    console.log('setUser :', user);
  }, [user]);
  return (
    <>
      <Header />
      {user?.bio}
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
          {username == userlogin?.user.username && (
            <Button className='cursor-pointer' variant={'secondary'}>
              <Link to='/edit'>Edit Profile</Link>
            </Button>
          )}
        </div>
        <div className='py-4'>{user?.bio}</div>
        <div className='flex justify-between pb-4'>
          <div className='flex-1 border-r border-neutral-700 text-center'>
            <div className='text-xl font-bold'>{user?.counts.post}</div>
            <div className='text-md font-normal text-neutral-400'>Post</div>
          </div>
          <div className='flex-1 border-r border-neutral-700 text-center'>
            <div className='text-xl font-bold'>{user?.counts.followers}</div>
            <div className='text-md font-normal text-neutral-400'>
              Followers
            </div>
          </div>
          <div className='flex-1 border-r border-neutral-700 text-center'>
            <div className='text-xl font-bold'>{user?.counts.following}</div>
            <div className='text-md font-normal text-neutral-400'>
              Following
            </div>
          </div>
          <div className='flex-1 text-center'>
            <div className='text-xl font-bold'>{user?.counts.likes}</div>
            <div className='text-md font-normal text-neutral-400'>Likes</div>
          </div>
        </div>
        <Tabs defaultValue='gallery' className=''>
          <TabsList className='w-full'>
            <TabsTrigger value='gallery'>Gallery</TabsTrigger>
            {username == userlogin?.user.username && (
              <TabsTrigger value='saved'>Saved</TabsTrigger>
            )}
          </TabsList>
          <TabsContent value='gallery'>
            {user?.id && <AuthorImages authorId={user?.id} />}
          </TabsContent>
          <TabsContent value='saved'>
            <SavedGallery />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
