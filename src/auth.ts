import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: '/i/flow/login',
    newUser: '/i/flow/signup',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      //로그인 form 내용
      credentials: {
        email: { label: 'email', type: 'text', placeholder: '이메일입력' },
        password: { label: 'password', type: 'password' },
      },
      // 로그인 요청 시 실행되는 코드
      async authorize(credentials) {
        console.log('authorize function started');
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(credentials),
            },
          );
          console.log('fetch executed');
          const user = await res.json();
          console.log('user', user);
          return user || null;
        } catch (e) {
          console.error(e);
        }
      },
    }),
  ],
});
