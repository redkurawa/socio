import { GetService } from '@/services/service';
import type { Comment } from '@/types/comment';
import type { FeedItem } from '@/types/feed';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Header } from '../layouts/header';
import { UserAvatar } from '../layouts/user-avatar';

export const PostDetail = () => {
  const [details, setDetails] = useState<FeedItem | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const { id } = useParams();
  const url = `posts/${id}`;
  const urlComment = `posts/${id}/comments`;
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
    const getComment = async () => {
      try {
        const r = await GetService(urlComment);
        // console.log(r.data.comments);
        setComments(r.data.comments);
        // console.log(comments);
      } catch (err) {}
    };
    getComment();
  }, []);

  useEffect(() => {
    console.log(comments);
  }, [comments]);
  return (
    <div>
      <Header />
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
                  <div>
                    <UserAvatar a={c.author} c={c.createdAt} />
                    <div>{c.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
