'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { WavyBackground } from '@/components/ui/background-waves';
import { FcGoogle } from 'react-icons/fc';
import { BsChatLeftHeartFill } from 'react-icons/bs';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      await signIn('google');
    } catch (error) {
      alert(error);

      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <WavyBackground backgroundFill='white'>
      <div className='bg-blue-300/70 flex flex-col rounded-xl w-screen h-screen text-center md:w-fit md:h-fit items-center justify-center gap-8 md:justify-around md:p-8 md:px-24'>
        <BsChatLeftHeartFill
          fill='white'
          className='absolute top-12 md:static size-20 md:size-10'
        />
        <h1 className='font-bold text-6xl md:text-5xl text-white'>Sign In</h1>
        <Button
          className='bg-white/10 hover:bg-white/30 gap-4 text-lg'
          onClick={loginWithGoogle}
          disabled={loading}
        >
          <FcGoogle size={20} />
          Sign in with Google
        </Button>
      </div>
    </WavyBackground>
  );
};

export default Login;
