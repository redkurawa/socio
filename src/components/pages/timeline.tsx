import { GetService } from '@/services/service';
import { socioStore } from '@/store/user';
import type { FeedItem } from '@/types/feed';
import type { AuthUser } from '@/types/user-auth';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '../ui/button';
import { Heart, MessageSquareText } from 'lucide-react';

export const Timeline = () => {
  const [user, setUser] = useState<AuthUser>();
  const [feeds, setFeeds] = useState<FeedItem[]>([]);
  const userlogin = socioStore((s) => s.authData);

  useEffect(() => {
    setUser(userlogin?.user);
  }, [userlogin]);

  useEffect(() => {
    const token = userlogin?.token;
    setUser(userlogin?.user);
    console.log(token);
    const getFeed = async () => {
      try {
        const r = await GetService('feed', token);
        console.log(r.data.items);
        setFeeds(r.data.items);
      } catch (e) {
        console.error(e);
      }
    };
    getFeed();
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      selamat datang {user?.name}
      <div className='flex gap-3'>
        <Button
          onClick={() => {
            navigate('/register');
          }}
        >
          register
        </Button>
        <Button
          onClick={() => {
            navigate('/login');
          }}
        >
          Login
        </Button>
        <Link to='/addpost'>
          <Button>Add Post</Button>
        </Link>
        <Link to='/user-search'>
          <Button>Search</Button>
        </Link>
      </div>
      <div>
        {feeds.map((feed) => (
          <div key={feed.id}>
            <img
              src={feed.imageUrl}
              alt=''
              className='w-full max-w-150 overflow-hidden object-cover'
            />
            <div className='flex gap-3'>
              <Heart />
              {feed.likeCount}
              <MessageSquareText />
              {feed.commentCount}
              <img src='/icons/share.svg' alt='' className='bg-black' />
            </div>
            {feed.author.name}
            <div>{feed.caption}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
