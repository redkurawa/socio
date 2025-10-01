import { useNavigate } from 'react-router';
import { Button } from '../ui/button';

export const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div>
      Homepage
      <div>helo</div>
      <div>word</div>
      <div className="mx-auto flex min-h-svh w-full items-center justify-center bg-black bg-[url('/images/Init.jpg')] bg-cover bg-center bg-no-repeat">
        <Button
          onClick={() => {
            navigate('/register');
          }}
        >
          Click me
        </Button>
        <Button
          onClick={() => {
            navigate('/login');
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
};
