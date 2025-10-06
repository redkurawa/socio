import type { Author } from '@/types/feed';
import { Capitalize } from '@/utils/capitalize';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router';

interface UserAvatarProps {
  a: Author;
  c: string;
}

export const UserAvatar = ({ a, c }: UserAvatarProps) => {
  dayjs.extend(relativeTime);
  return (
    <div className='mb-3 flex items-center gap-3'>
      <Link to={`/profile/${a.username}`} className='cursor-pointer'>
        {a.avatarUrl ? (
          <img src={a.avatarUrl} alt='' className='size-16 rounded-full' />
        ) : (
          <div className='size-16 rounded-full bg-neutral-800'></div>
        )}
      </Link>
      <Link to={`/profile/${a.username}`} className='cursor-pointer'>
        <div>
          <div className='text-md font-bold text-[#FDFDFD]'>
            {Capitalize(a.name)}
          </div>
          <div className='tex-sm text-neutral-400'>{dayjs(c).fromNow()}</div>
        </div>
      </Link>
    </div>
  );
};
