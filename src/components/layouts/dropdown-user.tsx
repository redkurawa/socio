import { userDropDown } from '@/types/user-dropdown';
import { useNavigate } from 'react-router';
import { DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu';
// import { useDispatch } from 'react-redux';
// import { logout } from '@/redux/auth-slice';
import { toast } from 'sonner';

export function DropDownUserMenu() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  return (
    <DropdownMenuContent className='w-56' side='bottom' align='end'>
      {userDropDown.map((data, i) => (
        <DropdownMenuItem
          key={i}
          onClick={() => {
            if (data.label === 'Logout') {
              // dispatch(logout());
              navigate('/');
              toast.success('Logout success');
            } else {
              navigate(`${data.href}`);
            }
          }}
        >
          {data.label}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );
}
