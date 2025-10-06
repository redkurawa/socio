import { GetService } from '@/services/service';
import type { FeedItem } from '@/types/feed';
import { useEffect, useState } from 'react';

interface LikePostProps {
  username?: string;
}

const LikePost = ({ username }: LikePostProps) => {
  const [feeds, setFeeds] = useState<FeedItem[]>([]);
  useEffect(() => {
    const getLikePost = async () => {
      const r = await GetService(`users/${username}/likes`);
      console.log(r.data.posts);
      setFeeds(r.data.posts);
    };
    getLikePost();
  }, []);
  return (
    <div className='grid grid-cols-2 gap-3 sm:grid-cols-3'>
      {feeds.map((it) => (
        <div
          key={it.id}
          className='h-[270px] w-full overflow-hidden rounded-[8px]'
        >
          <img
            src={it.imageUrl}
            alt=''
            className='h-full w-full object-cover'
          />
        </div>
      ))}
    </div>
  );
};

export default LikePost;
