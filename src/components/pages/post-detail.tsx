import { GetService, PostService } from '@/services/service';
import type { Comment } from '@/types/comment';
import type { FeedItem } from '@/types/feed';
import { Bookmark, Heart, MessageSquareText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { Header } from '../layouts/header';
import { UserAvatar } from '../layouts/user-avatar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { authStore } from '@/store/user';
import { toast } from 'sonner';

export const PostDetail = () => {
  const [details, setDetails] = useState<FeedItem | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState<string>('');
  const { id } = useParams();

  const user = authStore((s) => s.authData);

  const url = `posts/${id}`;
  const urlComment = `posts/${id}/comments`;

  const getComment = async () => {
    try {
      const r = await GetService(urlComment);
      // console.log(r.data.comments);
      let fetchedComments: Comment[] = r.data.comments || [];
      const sortedComments = fetchedComments.sort((a, b) => {
        // Mengubah string tanggal menjadi objek Date untuk perbandingan yang akurat
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();

        // Jika a lebih lama dari b (a - b < 0), maka a diletakkan sebelum b.
        // Hasilnya: ASCENDING (Lama -> Baru)
        return dateA - dateB;
      });
      setComments(sortedComments);
      // setComments(r.data.comments);
      // console.log(comments);
    } catch (err) {}
  };

  useEffect(() => {
    const getDetail = async () => {
      try {
        const r = await GetService(url);
        // const Data: FeedItem = r.data;
        // console.log(r.data);
        setDetails(r.data);
      } catch (err) {}
    };
    getDetail();
  }, []);

  useEffect(() => {
    getComment();
  }, [urlComment]);

  // useEffect(() => {
  //   console.log(comments);
  // }, [comments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim() || !user?.token) {
      return;
    }

    const apiPayload = { text: comment };

    try {
      const r = await PostService(
        `posts/${id}/comments`,
        apiPayload,
        user?.token
      );
      // console.log(r);
      toast.success(r.data.message);
      const newComment = r.data.data as Comment;
      if (newComment) {
        // setComments((prevComments) => [newComment, ...prevComments]);
        setComments((prevComments) => [...prevComments, newComment]);
        setDetails((prevDetails) =>
          prevDetails
            ? { ...prevDetails, commentCount: prevDetails.commentCount + 1 }
            : null
        );
        setComment('');
      } else {
        alert(
          'Komentar berhasil dikirim, tetapi gagal diperbarui di UI. Mencoba memuat ulang daftar..., atau refresh browser anda'
        );
        setComment('');
      }
    } catch (e: any) {
      console.error('Gagal submit komentar:', e);
      const msg = e?.response?.data?.message || 'post comment failed';
      toast.error(msg);
    }
  };

  return (
    <>
      <Header />
      <div className='mt-10'>
        {details ? (
          <div className='mx-auto w-full max-w-300 p-3 md:p-0 lg:flex'>
            <img
              src={details.imageUrl}
              alt={details.id.toString()}
              className='w-full max-w-180 object-cover'
            />
            <div className='flex-1 p-5'>
              <div>
                <UserAvatar a={details.author} c={details.createdAt} />
                <div className='border-b border-neutral-800 pb-4'>
                  {details.caption}
                </div>
                <h1 className='text-md mt-4 font-bold text-[#FDFDFD]'>
                  Comments
                </h1>
                <div>
                  {comments.map((c) => (
                    <div
                      key={c.id}
                      className='border-b border-neutral-800 py-4'
                    >
                      <UserAvatar a={c.author} c={c.createdAt} />
                      <div>{c.text}</div>
                    </div>
                  ))}
                </div>
                <div className='my-3 flex justify-between'>
                  <div className='flex gap-3'>
                    <div
                      // onClick={() => handleLike(feed.id, feed.likedByMe)}
                      className='flex cursor-pointer gap-1'
                    >
                      <Heart
                        className={`${details.likedByMe ? 'fill-red-500 text-red-700' : ''}`}
                      />
                      <span>{details.likeCount}</span>
                    </div>
                    <Link
                      to={`/posts/${details.id}`}
                      className='flex cursor-pointer gap-1'
                    >
                      <MessageSquareText />
                      {details.commentCount}
                    </Link>
                    <img src='/icons/share.svg' alt='' className='bg-black' />
                  </div>
                  <Bookmark />
                </div>
                <form
                  onSubmit={handleSubmit}
                  className='mt-4 flex items-center space-x-2 rounded-xl border border-neutral-800 bg-neutral-900 p-2 dark:border-neutral-700'
                >
                  <Input
                    type='text'
                    placeholder='Add Comment'
                    id='text'
                    className='flex-grow border-none bg-transparent text-white placeholder-neutral-500 focus-visible:ring-0 focus-visible:ring-offset-0'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />

                  <Button
                    type='submit'
                    size='icon'
                    className='text-md shrink-0 text-neutral-500'
                  >
                    Post
                  </Button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
