import { GetService, PostService } from '@/services/service';
import type { User } from '@/types/user-search';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { socioStore } from '@/store/user';
import { toast } from 'sonner';

export const UserSearch = () => {
  const user = socioStore((s) => s.authData);
  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const getUser = async () => {
      const r = await GetService('users/search?q=a');
      console.log(r.data.users);
      setUsers(r.data.users);
    };
    getUser();
  }, []);

  useEffect(() => {
    console.log('data :', users);
  }, [users]);

  // const handleFollow = async (username: string) => {
  //   try {
  //     const r = await PostService(`follow/${username}`, user?.token);
  //     console.log(r);
  //     if (r.data?.success === false) {
  //       toast.error(r.data.message || 'Following fail');
  //     } else {
  //       toast.success('Review saved');
  //     }
  //   } catch (e: any) {
  //     const msg = e?.response?.data?.message || 'post review failed';
  //     toast.error(msg);
  //   }
  // };

  const handleFollow = async (username: string) => {
    console.log(user?.token);
    try {
      const r = await PostService(`follow/${username}`, undefined, user?.token);
      console.log(r);

      if (r.data?.success === false) {
        toast.error(r.data.message || 'Following fail');
      } else {
        const msg = r.data?.message || 'Follow success';
        toast.success(msg); // ⬅️ muncul toast dari message backend
      }
    } catch (e: any) {
      const msg = e?.response?.data?.message || 'Follow failed';
      toast.error(msg);
    }
  };

  return (
    <div>
      Welkome back : {user?.user.name}
      {users.map((user) => (
        <div key={user.id} className='mb-4 flex gap-3 rounded-2xl border p-4'>
          <div className=''>
            <div>
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className='size-20 rounded-md'
                />
              ) : (
                <div className='bg-accent-yellow size-20 rounded-md'></div>
              )}
            </div>
          </div>
          <div className='h-fit cursor-pointer'>
            <p>name : {user.name}</p>
            <p>username : {user.username}</p>
            <Button
              variant={'secondary'}
              onClick={() => handleFollow(user.username)}
            >
              Follow
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
