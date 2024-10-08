'use server';

import { signIn } from '@/auth';
import { redirect } from 'next/navigation';

export default async (prevState: any, formData: FormData) => {
  console.log(formData);
  let shouldRedirect = false;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`,
      {
        method: 'POST',
        body: formData,
        credentials: 'include',
      },
    );
    console.log(res.status);
    console.log(res);
    if (res.status === 403) {
      return { message: 'user_exists' };
    }

    console.log(await res.json());
    shouldRedirect = true;

    // 회원가입 후 로그인 처리
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });
  } catch (err) {
    console.error(err);
    return { message: null };
  }

  if (shouldRedirect) {
    redirect('/home');
  }
  return { message: null };
};
