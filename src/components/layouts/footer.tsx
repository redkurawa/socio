import { Link } from 'react-router';

export const Footer = () => {
  return (
    <>
      <div className='sticky bottom-2 mx-auto flex w-full max-w-90 justify-center gap-11 rounded-full bg-black/70 p-3'>
        <Link to='/' className='flex flex-col items-center'>
          <img src='/icons/home.svg' alt='' />
          Home
        </Link>
        <Link to='/addpost'>
          <img src='/icons/add.svg' alt='' />
        </Link>
        <Link to='/profile' className='flex flex-col items-center'>
          <img src='/icons/profile.svg' alt='' />
          Profile
        </Link>
      </div>
    </>
  );
};
