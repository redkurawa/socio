import type { Pagination } from '@/types/pagination';
import { Link } from 'react-router';
import { Button } from '../ui/button';

// type PageProps = { page: Pagination };

// export const Page = ({ page }: PageProps) => {
export const Page = (page: Pagination) => {
  return (
    <div className='mt-5 flex w-full items-center justify-center gap-5'>
      <div>limit : {page?.limit}</div>
      <div>page : {page?.page}</div>
      <div>total : {page?.total}</div>
      <div>totalPages : {page?.totalPages}</div>
      <Link to='/user-search'>
        <Button variant={'secondary'}>Search</Button>
      </Link>
    </div>
  );
};
