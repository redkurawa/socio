import { userDropDown } from '@/types/user-dropdown';
import { useNavigate } from 'react-router';
import { DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu';
import { toast } from 'sonner';
import { authStore } from '@/store/user';

export function DropDownUserMenu() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const user = authStore((s) => s.authData);
  const clearAuthData = authStore((s) => s.clearAuthData);

  return (
    <DropdownMenuContent className='w-10' side='bottom' align='end'>
      {userDropDown.map((data, i) => (
        <DropdownMenuItem
          key={i}
          onClick={() => {
            if (data.label === 'Logout') {
              clearAuthData();
              navigate('/');
              toast.success('Logout success');
            } else {
              navigate(`${data.href}/${user?.user.username}`);
            }
          }}
        >
          {data.label}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );
}
