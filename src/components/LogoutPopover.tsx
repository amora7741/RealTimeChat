'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Button } from '@/components/ui/button';
import LoadingButton from '@/components/LoadingButton';
import { Ellipsis } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { toast } from '@/components/ui/use-toast';

const LogoutPopover = ({
  userImage,
  userName,
  userEmail,
}: {
  userImage: string | null | undefined;
  userName: string | null | undefined;
  userEmail: string | null | undefined;
}) => {
  const [loading, setLoading] = useState(false);

  const logOut = async () => {
    try {
      setLoading(true);

      await signOut();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An issue occurred while signing out.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost' className='w-full py-8'>
          <div className='flex justify-between items-center w-full'>
            <div className='flex items-center gap-2'>
              <div className='relative size-10 border rounded-full'>
                {userImage && (
                  <Image
                    fill
                    referrerPolicy='no-referrer'
                    className='rounded-full'
                    src={userImage || ''}
                    alt='Your profile image'
                  />
                )}
              </div>
              <div className='flex flex-col items-start'>
                <p className='font-semibold'>{userName || 'No user'}</p>
                <p className='text-xs '>{userEmail || ''}</p>
              </div>
            </div>
            <Ellipsis />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent side='top' className='bg-white/30 border-none'>
        <LoadingButton onClick={logOut} loading={loading} className='w-full'>
          Log out
        </LoadingButton>
      </PopoverContent>
    </Popover>
  );
};

export default LogoutPopover;
