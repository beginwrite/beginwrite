import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { useAuthUser } from '@/hooks/useAuthUser';

export type AuthProps = {
  children: React.ReactNode;
};

export default function Auth({ children }: AuthProps) {
  const router = useRouter();
  const id =
    typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;

  const authUser = useAuthUser(id!);
  const [isRedirect, setIsRedirect] = useState(true);

  useEffect(() => {
    if (router.isReady && !id && !authUser && router.pathname !== '/login') {
      router.replace('/login');
    } else {
      setIsRedirect(false);
    }
  }, [authUser, router, id]);

  return isRedirect ? null : <>{children}</>;
}
