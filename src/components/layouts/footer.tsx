import { authStore } from '@/store/user';
import { Link } from 'react-router';

export const Footer = () => {
  const user = authStore((s) => s.authData);
  return (
    <>
      <div className='sticky bottom-2 mx-auto flex w-full max-w-90 justify-center gap-11 rounded-full bg-black/70 p-3'>
        <Link to='/timeline' className='flex flex-col items-center'>
          <img src='/icons/home.svg' alt='' />
          Home
        </Link>
        <Link to='/addpost'>
          <img src='/icons/add.svg' alt='' />
        </Link>
        <Link
          to={`/profile/${user?.user.username}`}
          className='flex flex-col items-center'
        >
          <img src='/icons/profile.svg' alt='' />
          Profile
        </Link>
      </div>
    </>
  );
};
