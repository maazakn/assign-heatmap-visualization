import dynamic from 'next/dynamic';
import { PageLoader } from '@/components';
const Home = dynamic(() => import('@/components/client/Home'), {
  ssr: false,
  loading: () => <PageLoader text='Heapmap loading...' />,
});

export default function HomePage() {
  return <Home />;
}
