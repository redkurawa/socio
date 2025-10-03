import { socioStore } from '@/store/user';
import type { AuthUser } from '@/types/user-auth';
import { useEffect, useState } from 'react';

export const Homepage = () => {
  const [user, setUser] = useState<AuthUser>();

  const userlogin = socioStore((s) => s.authData);

  useEffect(() => {
    if (!userlogin?.token) return;
    setUser(userlogin?.user);
  }, [userlogin]);

  // const navigate = useNavigate();

  return (
    <div>
      selamat datang {user?.name}
      {/* <div className='flex gap-3'>
        <Button
          onClick={() => {
            navigate('/register');
          }}
        >
          register
        </Button>
        <Button
          onClick={() => {
            navigate('/login');
          }}
        >
          Login
        </Button>
        <Link to='/addpost'>
          <Button>Add Post</Button>
        </Link>
        <Link to='/user-search'>
          <Button>Search</Button>
        </Link>
      </div> */}
    </div>
  );
};
