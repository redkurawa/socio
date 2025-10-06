import { GetService } from '@/services/service';
import { authStore } from '@/store/user';
import type { userProfile } from '@/types/profile';
import { ArrowLeft, Bookmark, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { AuthorPost } from '../layouts/author-post';
import { Header } from '../layouts/header';
import UserLike from '../layouts/like-dialog';
import SavedGallery from '../layouts/save-page';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import LikePost from '../layouts/like-post';

export const UserProfile = () => {
  const [user, setUser] = useState<userProfile>();
  const [activeLikeType, setActiveLikeType] = useState<
    'follower' | 'following' | null
  >(null);
  const [activeLikeDialogId, setActiveLikeDialogId] = useState<number | null>(
    null
  );

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
      <div className='mx-auto w-full max-w-203 px-2 sm:p-0'>
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
          <div className='flex-1 justify-center border-r border-neutral-700 text-center'>
            <div className='flex justify-center'>
              {user?.id && (
                <div
                  onClick={() => {
                    setActiveLikeDialogId(user.id);
                    setActiveLikeType('follower');
                  }}
                  className='hover:bg-primary-300 flex-center size-7 cursor-pointer font-medium hover:rounded-full'
                >
                  <div className='text-xl font-bold'>
                    {user?.counts.followers}
                  </div>
                </div>
              )}

              {activeLikeDialogId === user?.id &&
                activeLikeType === 'follower' && (
                  <UserLike
                    id={user.id}
                    onClose={() => {
                      setActiveLikeDialogId(null);
                      setActiveLikeType(null);
                    }}
                    type='follower'
                    username={user.username}
                  />
                )}
            </div>
            <div className='text-md font-normal text-neutral-400'>
              Followers
            </div>
          </div>
          <div className='flex-1 border-r border-neutral-700 text-center'>
            <div className='flex justify-center'>
              {user?.id && (
                <div
                  onClick={() => {
                    setActiveLikeDialogId(user.id);
                    setActiveLikeType('following');
                  }}
                  className='hover:bg-primary-300 flex-center size-7 cursor-pointer font-medium hover:rounded-full'
                >
                  <div className='text-xl font-bold'>
                    {user?.counts.following}
                  </div>
                </div>
              )}

              {activeLikeDialogId === user?.id &&
                activeLikeType === 'following' && (
                  <UserLike
                    id={user.id}
                    onClose={() => {
                      setActiveLikeDialogId(null);
                      setActiveLikeType(null);
                    }}
                    type='following'
                    username={user.username}
                  />
                )}
            </div>
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
            <TabsTrigger value='gallery'>
              <img src='/icons/gallery.svg' alt='gallery' /> Gallery
            </TabsTrigger>
            <TabsTrigger value='saved'>
              {userlogin?.user.username == username ? (
                <>
                  {' '}
                  <Bookmark className='fill-white' />
                  Saved
                </>
              ) : (
                <>
                  <Heart className='fill-white' /> Liked
                </>
              )}
            </TabsTrigger>
          </TabsList>
          <TabsContent value='gallery'>
            {user?.id && <AuthorPost authorId={user?.id} />}
          </TabsContent>
          <TabsContent value='saved'>
            {userlogin?.user.username == username ? (
              <SavedGallery />
            ) : (
              <LikePost username={username} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
