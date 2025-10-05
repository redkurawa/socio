import { useQueryClient } from '@tanstack/react-query';
import type { FeedItem } from '@/types/feed';

export function AuthorImages({ authorId }: { authorId: number }) {
  const queryClient = useQueryClient();

  const cached = queryClient.getQueryData<{
    pages: { items: FeedItem[] }[];
  }>(['feed', { limit: 20 }]);

  const items =
    cached?.pages
      .flatMap((p) => p.items ?? [])
      .filter((i) => i.author?.id === authorId) ?? [];

  if (!items.length) {
    return (
      <div className='text-[#aaa]'>Tidak ada postingan dari author ini.</div>
    );
  }

  return (
    <div className='grid grid-cols-2 gap-3 sm:grid-cols-3'>
      {items.map((it) => (
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
}
