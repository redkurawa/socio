import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';

type LoadingProps = {
  loading?: boolean;
};

export const Loading = ({ loading = false }: LoadingProps) => {
  return (
    <div>
      <Dialog open={loading}>
        <DialogContent className='flex w-60 items-center text-center'>
          <DialogTitle className='hidden'>Are you absolutely sure?</DialogTitle>
          <DialogDescription className='hidden'></DialogDescription>
          <Loader2 className='text-muted-foreground size-20 animate-spin' />
          <div className='text-left'>
            <div className='text-lg font-semibold text-black'>
              Prosesing ...
            </div>
            <div className='text-lg font-semibold'>Please wait</div>
          </div>
        </DialogContent>
        {/* <DialogContent className='flex w-60 flex-col items-center justify-center gap-4 text-center'>
          <Loader2 className='text-primary-200 size-20 animate-spin' />
          <div className='text-center'>
            <div className='text-lg font-semibold text-black'>
              Prosesing ...
            </div>
            <div className='text-lg font-semibold'>Please wait</div>
          </div>
        </DialogContent> */}
      </Dialog>
    </div>
  );
};
