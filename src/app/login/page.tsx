'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const loginWithGoogle = async () => {
    try {
      await signIn('google');
    } catch (error) {
      alert(error);

      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className='bg-black text-white hover:bg-neutral-500'
      disabled={loading}
      onClick={loginWithGoogle}
    >
      Log in
    </Button>
  );
};

export default Login;
