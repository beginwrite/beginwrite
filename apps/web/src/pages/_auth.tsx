import { useAuthUser } from '@/hooks/useAuthUser';

export type AuthProps = {
  children: React.ReactNode;
};

export default function Auth({ children }: AuthProps) {
  const id =
    typeof window !== 'undefined' ? localStorage.getItem('user_id') : '0';
  const authUser = useAuthUser(id as string);

  if (!authUser) {
    return null;
  }

  return <>{children}</>;
}
