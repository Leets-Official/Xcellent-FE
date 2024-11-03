'use client';
import Main from '@/app/(route)/(beforeLogin)/_component/Main';
import { useRouter } from 'next/navigation';

export default function RedirectToLogin() {
  const router = useRouter();
  router.replace('/i/flow/login');
  return <Main />;
}
