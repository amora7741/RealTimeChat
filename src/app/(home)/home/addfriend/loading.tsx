import { Skeleton } from '@/components/ui/skeleton';

const LoadingPage = () => {
  return (
    <div className='flex flex-col w-full'>
      <Skeleton className='w-[250px] h-[40px] mb-8' />
      <Skeleton className='w-[180px] h-[20px] mb-4' />
      <div className='flex gap-4'>
        <Skeleton className='w-[365px] h-[40px]' />
        <Skeleton className='w-[65px] h-[40px]' />
      </div>
    </div>
  );
};

export default LoadingPage;
