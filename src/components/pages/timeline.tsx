import { GetService, PostService } from '@/services/service';
import { socioStore } from '@/store/user';
import type { FeedItem } from '@/types/feed';
// import type { AuthUser } from '@/types/user-auth';
import { Capitalize } from '@/utils/capitalize';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Heart, MessageSquareText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Footer } from '../layouts/footer';
import { Header } from '../layouts/header';
import { UserAvatar } from '../layouts/user-avatar';

export const Timeline = () => {
  // const [user, setUser] = useState<AuthUser>();
  const [feeds, setFeeds] = useState<FeedItem[]>([]);
  const userlogin = socioStore((s) => s.authData);
  const navigate = useNavigate();
  dayjs.extend(relativeTime);

  useEffect(() => {
    const token = userlogin?.token;
    if (!token) {
      navigate('/');
      return;
    }
    // setUser(userlogin?.user);
    // console.log(token);
    const getFeed = async () => {
      try {
        const r = await GetService('feed', token);
        // console.log(r.data.items);
        setFeeds(r.data.items);
      } catch (e) {
        console.error(e);
      }
    };
    getFeed();
  }, []);

  const handleLike = async (feedId: number) => {
    try {
      const r = await PostService(
        `posts/${feedId}/like`,
        undefined,
        userlogin?.token
      );
      const { liked, likeCount } = r.data.data;
      if (r.data.message == 'Already liked') {
        toast.warning(r.data.message);
      }
      setFeeds((prevFeeds) =>
        prevFeeds.map((feed) =>
          feed.id === feedId ? { ...feed, liked, likeCount } : feed
        )
      );
    } catch (e: any) {
      console.error('Failed to like post:', e);
      const msg = e?.response?.data?.message || 'post review failed';
      toast.error(msg);
    }
  };

  return (
    <>
      <Header />
      <div className='mx-auto mt-10 w-full max-w-150'>
        {/* selamat datang {user?.name} */}
        {/* <div className='flex gap-3'>
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
        </div> */}
        <div className='p-2 sm:p-0'>
          {feeds.map((feed) => (
            <div key={feed.id} className='mb-12'>
              <UserAvatar a={feed.author} c={feed.createdAt} />
              <img
                src={feed.imageUrl}
                alt=''
                className='w-full max-w-150 overflow-hidden rounded-[8px] object-cover'
              />
              <div className='my-3 flex gap-3'>
                <div
                  onClick={() => handleLike(feed.id)}
                  className='flex cursor-pointer gap-1'
                >
                  <Heart />
                  <span>{feed.likeCount}</span>
                </div>
                <Link
                  to={`/posts/${feed.id}`}
                  className='flex cursor-pointer gap-1'
                >
                  <MessageSquareText />
                  {feed.commentCount}
                </Link>
                <img src='/icons/share.svg' alt='' className='bg-black' />
              </div>
              <div className='text-md font-bold text-[#FDFDFD]'>
                {Capitalize(feed.author.name)}
              </div>
              <div>{feed.caption}</div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};
