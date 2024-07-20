import { Skeleton } from '@/components/ui/skeleton';

const LoadingPage = () => {
  return (
    <div className='flex flex-col w-full'>
      <Skeleton className='w-[460px] h-[40px] mb-8' />
      <Skeleton className='w-[250px] h-[20px] mb-8' />

      <div className='flex flex-col gap-y-4'>
        <Skeleton className='w-full h-[40px]' />
        <Skeleton className='w-full h-[40px]' />
        <Skeleton className='w-full h-[40px]' />
      </div>
    </div>
  );
};

export default LoadingPage;
