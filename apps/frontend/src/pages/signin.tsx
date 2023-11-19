import { useCallback } from 'react';
import { signIn } from 'next-auth/react';

export default function Signin() {
  const githubSignIn = useCallback(() => {
    signIn('github', { callbackUrl: '/home' });
  }, []);
  return (
    <div>
      <button onClick={githubSignIn}>Signin</button>
    </div>
  )
}
