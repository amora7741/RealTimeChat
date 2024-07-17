import React from 'react';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ loading, children, ...props }) => {
  return (
    <Button
      className='text-lg relative text-white'
      disabled={loading}
      {...props}
    >
      {loading && <Loader2 className='size-8 absolute animate-spin' />}
      <div className={`${loading ? 'invisible' : ''} flex gap-2 items-center`}>
        {children}
      </div>
    </Button>
  );
};

export default LoadingButton;
