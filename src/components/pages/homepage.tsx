import { useNavigate } from 'react-router';
import { Button } from '../ui/button';

export const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div>
      Homepage
      <div>helo</div>
      <div>word</div>
      <div className='flex min-h-svh flex-col items-center justify-center'>
        <Button
          onClick={() => {
            navigate('/register');
          }}
        >
          Click me
        </Button>
      </div>
    </div>
  );
};
