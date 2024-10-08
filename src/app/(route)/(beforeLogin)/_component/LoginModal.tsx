'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';

export default function LoginModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const onSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await signIn('credentials', {
        username: email,
        password,
        redirect: false,
      });
      if (!res?.ok) {
        setMessage('아이디와 비밀번호가 일치하지 않습니다.');
      } else {
        router.replace('/home');
      }
    } catch (err) {
      console.error(err);
      setMessage('아이디와 비밀번호가 일치하지 않습니다.');
    }
  };
  const onClickClose = () => {};
  const onChangeId: ChangeEventHandler<HTMLInputElement> = e => {
    setEmail(e.target.value);
  };
  const onChangePassword: ChangeEventHandler<HTMLInputElement> = e => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email" className="text-white">
            이메일
            <input
              id="email"
              className="bg-white"
              value={email}
              onChange={onChangeId}
              type="text"
              placeholder=""
            />
          </label>
        </div>

        <div>
          <label htmlFor="password" className="text-white">
            비밀번호
          </label>
          <input
            id="password"
            value={password}
            onChange={onChangePassword}
            type="password"
            placeholder=""
          />
        </div>

        <div>
          <button className="text-white">로그인하기</button>
        </div>
      </form>
    </div>
  );
}
