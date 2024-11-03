'use client';

import { Login } from '@/app/api/auth/auth';
import { useRouter } from 'next/navigation';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';

export default function LoginModal() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    message: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const router = useRouter();

  const onSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();

    try {
      const res = await Login(formData);
      if (!res.ok) {
        setFormData(data => ({
          ...data,
          message: '아이디와 비밀번호가 일치하지 않습니다.',
        }));
      } else {
        alert('로그인 성공!');
        router.replace('/home');
      }
    } catch (err) {
      console.error(err);
      setFormData(data => ({
        ...data,
        message: '로그인 중 오류가 발생했습니다.',
      }));
    }

    return (
      <div>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="email" className="text-white">
              이메일
            </label>
            <input
              id="email"
              className="bg-white"
              value={formData.email}
              onChange={handleChange}
              type="text"
              placeholder=""
            />
          </div>

          <div>
            <label htmlFor="password" className="text-white">
              비밀번호
            </label>
            <input
              id="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder=""
            />
          </div>
          {message && <p className="text-red-500">{message}</p>}

          <button className="text-white">로그인하기</button>
        </form>
      </div>
    );
  };
}
