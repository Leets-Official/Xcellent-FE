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
        body: JSON.stringify(formData),
        credentials: 'include', // 쿠키 저장
      },
    ).then(response => {
      if (response.ok) {
        alert('회원가입이 완료되었습니다.');
        redirect('/login');
      }
    });

    // console.log(res.status);
    // // console.log(res);
    // if (res.ok) {
    //   // 회원가입 성공 시 처리
    //   console.log('유저 등록 완료');
    // } else {
    //   // 회원가입 실패 시 처리
    //   console.error('유저 등록 에러');
    // }
    // console.log(await res.json());_

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
    redirect('/home'); // try catch문안에서 X
  }
  return { message: null };
};
