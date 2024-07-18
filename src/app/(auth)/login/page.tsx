'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { WavyBackground } from '@/components/ui/background-waves';
import { FcGoogle } from 'react-icons/fc';
import { BsFillChatSquareHeartFill } from 'react-icons/bs';
import LoadingButton from '@/components/LoadingButton';
import { toast } from '@/components/ui/use-toast';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      await signIn('google');
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
    <WavyBackground backgroundFill='white'>
      <div className='bg-blue-300/70 backdrop-blur-xl flex flex-col md:rounded-xl w-screen h-screen text-center md:w-fit md:h-fit items-center justify-center gap-8 md:p-8 md:px-24'>
        <BsFillChatSquareHeartFill
          fill='white'
          className='size-12 md:size-10'
        />
        <h1 className='font-bold text-5xl md:text-4xl text-white'>Sign In</h1>
        <LoadingButton loading={loading} onClick={loginWithGoogle}>
          <FcGoogle size={20} />
          Sign in with Google
        </LoadingButton>
      </div>
    </WavyBackground>
  );
};

export default Login;
