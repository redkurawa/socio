import { DelService, GetService, PostService } from '@/services/service';
import { authStore } from '@/store/user';
import type { FeedItem } from '@/types/feed';
import type { Like } from '@/types/like';
import type { Pagination } from '@/types/pagination';
import { Capitalize } from '@/utils/capitalize';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Bookmark, Heart, MessageSquareText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Footer } from '../layouts/footer';
import { Header } from '../layouts/header';
import { Page } from '../layouts/pagination';
import { UserAvatar } from '../layouts/user-avatar';
import { bookmarkStore } from '@/store/bookmark';

export const Timeline = () => {
  const [feeds, setFeeds] = useState<FeedItem[]>([]);
  const [page, setPage] = useState<Pagination>();
  const [like, setLike] = useState<Like>();
  const navigate = useNavigate();
  dayjs.extend(relativeTime);

  const userlogin = authStore((s) => s.authData);

  // const handleLike = async (feedId: number, byMe: boolean) => {
  //   console.log(byMe);
  //   try {
  //     const r = await PostService(
  //       `posts/${feedId}/like`,
  //       undefined,
  //       userlogin?.token
  //     );
  //     setLike(r.data.data);
  //     console.log('Like response:', r.data.data);
  //     const { liked: likedByMe, likeCount } = r.data.data;
  //     if (r.data.message == 'Already liked') {
  //       toast.warning(r.data.message);
  //     }
  //     setFeeds((prevFeeds) =>
  //       prevFeeds.map((feed) =>
  //         feed.id === feedId ? { ...feed, likedByMe, likeCount } : feed
  //       )
  //     );
  //   } catch (e: any) {
  //     console.error('Failed to like post:', e);
  //     const msg = e?.response?.data?.message || 'post review failed';
  //     toast.error(msg);
  //   }
  // };

  const handleLike = async (feedId: number, byMe: boolean) => {
    try {
      const r = byMe
        ? await DelService(`posts/${feedId}/like`, userlogin?.token)
        : await PostService(
            `posts/${feedId}/like`,
            undefined,
            userlogin?.token
          );

      const updatedLike: Like = r.data.data;
      const { liked: likedByMe, likeCount } = updatedLike;

      setFeeds((prevFeeds) =>
        prevFeeds.map((feed) => {
          if (feed.id !== feedId) return feed;
          if (feed.likedByMe === likedByMe && feed.likeCount === likeCount) {
            return feed;
          }
          return { ...feed, likedByMe, likeCount };
        })
      );

      if (r.data.message === 'Already liked') {
        toast.warning('You already liked this post.');
      }

      setLike((prev) =>
        prev?.liked === updatedLike.liked &&
        prev.likeCount === updatedLike.likeCount
          ? prev
          : updatedLike
      );
      console.log(like);
      toast.success(r.data.message);
      // console.log('Like response:', updatedLike);
    } catch (e: any) {
      console.error('Failed to like post:', e);
      const msg = e?.response?.data?.message || 'post review failed';
      toast.error(msg);
    }
  };

  const addbookmark = bookmarkStore((s) => s.addBookmark);
  useEffect(() => {
    if (!userlogin?.token) return;
    const getBookmark = async () => {
      const r = await GetService('me/saved', userlogin?.token);
      // console.log('Items before addBookmark:', r.data.posts);
      addbookmark(r.data.posts);
      return r;
    };
    getBookmark();
  }, []);

  // <pre className='text-white'>{JSON.stringify(savebook, null, 2)}</pre>;

  useEffect(() => {
    const token = userlogin?.token;
    if (!token) {
      navigate('/login');
      return;
    }
    const getFeed = async () => {
      try {
        const r = await GetService('feed', token);
        // console.log(r.data.items);
        setFeeds(r.data.items);
        setPage(r.data.pagination);
      } catch (e) {
        console.error(e);
      }
    };
    getFeed();
  }, []);

  return (
    <>
      {!userlogin ? navigate('/login') : <div></div>}
      <Header />
      {page && <Page {...page} />}

      <div className='mx-auto mt-10 w-full max-w-150'>
        <div className='p-2 sm:p-0'>
          {feeds.map((feed) => (
            <div key={feed.id} className='mb-12'>
              <UserAvatar a={feed.author} c={feed.createdAt} />
              <img
                src={feed.imageUrl}
                alt=''
                className='w-full max-w-150 overflow-hidden rounded-[8px] object-cover'
              />
              <div className='my-3 flex justify-between'>
                <div className='flex gap-3'>
                  <div
                    onClick={() => handleLike(feed.id, feed.likedByMe)}
                    className='flex cursor-pointer gap-1'
                  >
                    <Heart
                      className={`${feed.likedByMe ? 'fill-red-500 text-red-700' : ''}`}
                    />
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
                <Bookmark />
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
