// SavedGallery.tsx
import { useQueryClient } from '@tanstack/react-query';
import type { FeedItem } from '@/types/feed';

type SavedResponse = { posts: FeedItem[] };

export default function SavedGallery() {
  const queryClient = useQueryClient();

  // Ambil data dari cache queryKey: ['saved']
  const cached = queryClient.getQueryData<SavedResponse>(['saved']);
  const items = cached?.posts ?? [];

  if (!items.length) {
    return (
      <div className='text-sm text-[#aaa]'>
        Tidak ada data di cache 'saved'.
      </div>
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
