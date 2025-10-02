interface UserDropDown {
  label: string;
  href: string;
}

export const userDropDown: UserDropDown[] = [
  {
    label: 'Profile',
    href: '/user/profile',
  },
  {
    label: 'Borrow List',
    href: '/user/borrow',
  },
  {
    label: 'Reviews',
    href: '/user/review',
  },
  {
    label: 'Logout',
    href: '/logout',
  },
];
