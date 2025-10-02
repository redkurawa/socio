export const Footer = () => {
  return (
    <>
      <div className='sticky bottom-0 mx-auto flex w-full max-w-90 justify-center gap-11 rounded-full bg-black/70 p-3'>
        <div className='flex flex-col items-center'>
          <img src='/icons/home.svg' alt='' />
          Home
        </div>
        <div>
          <img src='/icons/add.svg' alt='' />
        </div>
        <div className='flex flex-col items-center'>
          <img src='/icons/profile.svg' alt='' />
          Profile
        </div>
      </div>
    </>
  );
};
