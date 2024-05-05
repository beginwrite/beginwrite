import { useParams } from 'next/navigation';

import EditProfile from '@/components/pages/EditProfile';

export default function SettingsProfilePage() {
  const params = useParams();

  if (!params?.id) return null;
  return <EditProfile id={params?.id as string} />;
}
