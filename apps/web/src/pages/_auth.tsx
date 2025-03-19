import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { useAuthUser } from '@/hooks/useAuthUser';

export type AuthProps = {
  children: React.ReactNode;
};

export default function Auth({ children }: AuthProps) {
  const router = useRouter();
  const { authUser, loading } = useAuthUser();

  const [isRedirect, setIsRedirect] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (router.isReady && !authUser && router.pathname !== '/login') {
        router.replace('/login');
      } else if (router.isReady && authUser && router.pathname === '/login') {
        router.replace('/home');
      } else {
        setIsRedirect(false);
      }
    }
  }, [authUser, router, loading]);

  return isRedirect ? null : <>{children}</>;
}
