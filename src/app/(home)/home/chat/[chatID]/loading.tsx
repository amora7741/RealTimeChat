import { Skeleton } from '@/components/ui/skeleton';
import { Ellipsis } from 'lucide-react';

const LoadingPage = () => {
  return (
    <div className='w-full'>
      <div className='grid grid-rows-[auto_1fr_auto] w-full h-full'>
        <div className='p-4 flex items-center gap-2'>
          <Skeleton className='w-[54px] h-[54px] rounded-full' />
          <div className='flex flex-col gap-2'>
            <Skeleton className='w-[250px] h-[5px] ' />
            <Skeleton className='w-[250px] h-[5px]' />
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <Ellipsis className='size-12 absolute animate-bounce' />
        </div>
        <div className='flex gap-2'>
          <Skeleton className='flex-1' />
          <Skeleton className='w-[56px] h-[64px]' />
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
