import { DelService, GetService, PostService } from '@/services/service';
import { bookmarkStore } from '@/store/bookmark';
import { authStore } from '@/store/user';
import type { FeedItem } from '@/types/feed';
import type { Like } from '@/types/like';
import type { Pagination } from '@/types/pagination';
import { Capitalize } from '@/utils/capitalize';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Bookmark, Heart, MessageSquareText } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Footer } from '../layouts/footer';
import { Header } from '../layouts/header';
import UserLike from '../layouts/like-dialog';
import { UserAvatar } from '../layouts/user-avatar';

import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
  type InfiniteData,
} from '@tanstack/react-query';

type FeedResponse = { items: FeedItem[]; pagination: Pagination };
type SavedResponse = { posts: FeedItem[] };

export const Timeline = () => {
  const [feeds, setFeeds] = useState<FeedItem[]>([]);
  const [page, setPage] = useState<Pagination>();

  // const [like, setLike] = useState<Like>();
  const [activeLikeDialogId, setActiveLikeDialogId] = useState<number | null>(
    null
  );

  const navigate = useNavigate();
  dayjs.extend(relativeTime);

  const user = authStore((s) => s.authData);
  const token = user?.token;
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  // =====================================================
  // SAVED / BOOKMARK QUERY
  // =====================================================
  const addbookmark = bookmarkStore((s) => s.addBookmark);

  const savedQuery = useQuery<SavedResponse>({
    queryKey: ['saved'],
    enabled: !!token,
    queryFn: async () => {
      const r = await GetService('me/saved', token!);
      return r.data as SavedResponse;
    },
  });

  useEffect(() => {
    if (savedQuery.data?.posts) {
      savedQuery.data.posts.forEach((item) => addbookmark(item));
    }
  }, [savedQuery.data, addbookmark]);

  const limit = 10;
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const feedQuery = useInfiniteQuery<
    FeedResponse,
    Error,
    FeedResponse,
    readonly ['feed', { limit: number }],
    number
  >({
    queryKey: ['feed', { limit }] as const,
    enabled: !!token,
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const r = await GetService(
        `feed?page=${pageParam}&limit=${limit}`,
        token!
      );
      return r.data as FeedResponse;
    },
    getNextPageParam: (lastPage, allPages) => {
      const p: any = lastPage?.pagination;
      if (p?.nextPage) return p.nextPage as number;
      if (p?.currentPage && p?.totalPages) {
        return p.currentPage < p.totalPages ? p.currentPage + 1 : undefined;
      }
      const lastItems = lastPage?.items ?? [];
      return lastItems.length === limit ? allPages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    const pages =
      (feedQuery.data as InfiniteData<FeedResponse> | undefined)?.pages ?? [];
    setFeeds(pages.flatMap((p: FeedResponse) => p.items ?? []));
    const last = pages[pages.length - 1];
    if (last?.pagination) setPage(last.pagination);
    console.log(page);
  }, [feedQuery.data]);

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          feedQuery.hasNextPage &&
          !feedQuery.isFetchingNextPage
        ) {
          feedQuery.fetchNextPage();
        }
      },
      { rootMargin: '200px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [
    feedQuery.hasNextPage,
    feedQuery.isFetchingNextPage,
    feedQuery.fetchNextPage,
  ]);

  const handleLike = async (feedId: number, byMe: boolean) => {
    try {
      const r = byMe
        ? await DelService(`posts/${feedId}/like`, token)
        : await PostService(`posts/${feedId}/like`, undefined, token);

      const updatedLike: Like = r.data.data;
      const { liked: likedByMe, likeCount } = updatedLike;

      setFeeds((prev) =>
        prev.map((f) => (f.id === feedId ? { ...f, likedByMe, likeCount } : f))
      );

      toast.success(r.data.message);
    } catch (e: any) {
      const msg = e?.response?.data?.message || 'post review failed';
      toast.error(msg);
    }
  };

  const handleBookmark = async (feedId: number) => {
    try {
      const cached = queryClient.getQueryData<SavedResponse>(['saved']);
      const alreadySaved = cached?.posts?.some((p) => p.id === feedId);

      if (alreadySaved) {
        await DelService(`posts/${feedId}/save`, token);
        toast.success('Bookmark dihapus');
      } else {
        await PostService(`posts/${feedId}/save`, null, token);
        toast.success('Bookmark disimpan');
      }

      // refresh cache saved agar sinkron
      await queryClient.invalidateQueries({ queryKey: ['saved'] });
    } catch (e: any) {
      const msg = e?.response?.data?.message || 'Gagal menyimpan bookmark';
      toast.error(msg);
    }
  };

  if (feedQuery.isLoading) {
    return (
      <>
        <Header />
        <div className='mx-auto mt-10 w-full max-w-150 p-2 text-[#FDFDFD] sm:p-0'>
          Memuat feed...
        </div>
        <Footer />
      </>
    );
  }

  if (feedQuery.isError) {
    return (
      <>
        <Header />
        <div className='mx-auto mt-10 w-full max-w-150 p-2 text-red-400 sm:p-0'>
          Gagal memuat feed.
        </div>
        <Footer />
      </>
    );
  }

  // Ambil cache saved untuk dibandingkan id
  const savedCache = queryClient.getQueryData<SavedResponse>(['saved']);
  const savedIds = new Set(savedCache?.posts?.map((p) => p.id) ?? []);

  return (
    <>
      <Header />
      {/* {page && <StatPage {...page} />} */}

      <div className='mx-auto mt-10 w-full max-w-150'>
        <div className='px-3 sm:p-0'>
          {feeds.map((feed) => (
            <div key={feed.id} className='mb-12'>
              <UserAvatar a={feed.author} c={feed.createdAt} />
              <Link to={`/posts/${feed.id}`} className='cursor-pointer'>
                <img
                  src={feed.imageUrl}
                  alt=''
                  className='w-full max-w-150 overflow-hidden rounded-[8px] object-cover'
                />
              </Link>
              <div className='my-3 flex justify-between'>
                <div className='flex items-center gap-1'>
                  <div
                    onClick={() => handleLike(feed.id, feed.likedByMe)}
                    className='flex cursor-pointer gap-1'
                  >
                    <Heart
                      className={`${feed.likedByMe ? 'fill-red-500 text-red-700' : ''}`}
                    />
                  </div>
                  <div>
                    <div
                      onClick={() => setActiveLikeDialogId(feed.id)}
                      className='hover:bg-primary-300 flex-center size-7 cursor-pointer font-medium hover:rounded-full hover:underline'
                    >
                      {feed.likeCount}
                    </div>

                    {activeLikeDialogId === feed.id && (
                      <UserLike
                        id={feed.id}
                        onClose={() => setActiveLikeDialogId(null)}
                        type='like'
                      />
                    )}
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

                {/* ================== BOOKMARK BUTTON ================== */}
                <div
                  onClick={() => handleBookmark(feed.id)}
                  className='cursor-pointer'
                >
                  {savedIds.has(feed.id) ? (
                    <Bookmark className='fill-white' />
                  ) : (
                    <Bookmark />
                  )}
                </div>
              </div>

              <div className='text-md font-bold text-[#FDFDFD]'>
                {Capitalize(feed.author.name)}
              </div>
              <div>{feed.caption}</div>
            </div>
          ))}
        </div>

        {/* Sentinel untuk auto-load */}
        <div ref={loadMoreRef} className='h-8 w-full' />
        {feedQuery.isFetchingNextPage && (
          <div className='mx-auto my-4 w-full max-w-150 p-2 text-[#FDFDFD] sm:p-0'>
            Memuat lagi...
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
