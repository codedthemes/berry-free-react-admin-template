import { redirect } from 'next/navigation';

// ==============================|| HOME PAGE ||============================== //

export default function HomePage() {
  redirect('/dashboard/default');
}
