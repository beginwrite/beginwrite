import type { MetaFunction } from '@remix-run/node';
import Users from '../components/pages/Users';
export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return <Users />;
}
