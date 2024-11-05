'use client';

import { useState } from 'react';
import { Login } from '@/app/api/auth/auth';
import { useRouter } from 'next/navigation';

export default function LoginModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleClose = () => {
    setIsOpen(false);
    router.back();
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data,
      [name]: value,
    }));
  };

  const onSubmit = async e => {
    e.preventDefault();

    try {
      const res = await Login(formData);
      if (!res.ok) {
        const errorData = await res.json();
        console.log('ErrorData: ', errorData);
        if (errorData.code === 401) {
          setMessage('이메일과 비밀번호가 일치하지 않습니다.');
        } else if (errorData.code === 404) {
          setMessage('존재하지 않는 유저입니다.');
        } else {
          setMessage('로그인 중 오류가 발생하였습니다.');
        }
        console.log(formData);
      } else {
        const data = await res.json();

        localStorage.setItem('accessToken', data.result.accessToken);
        localStorage.setItem('refreshToken', data.result.refreshToken);

        alert('로그인에 성공했습니다.');
        router.replace('/home'); // 로그인 성공 시 홈으로 이동
      }
    } catch (err) {
      console.error(err);
      setMessage('로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
      style={{ backgroundColor: 'rgba(104, 132, 145, 0.413)' }}
    >
      <div className="bg-black p-6 rounded-lg max-w-sm w-full text-center">
        <h2 className="text-2xl font-semibold text-white mb-4">로그인하세요</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <button
            onClick={handleClose}
            className="hover:bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="fill-white r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
            >
              <g>
                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z" />
              </g>
            </svg>
          </button>
          <div>
            <label htmlFor="email" className="block text-white mb-1">
              이메일
            </label>
            <input
              id="email"
              name="email"
              className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
              value={formData.email}
              onChange={handleChange}
              type="text"
              placeholder="이메일"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-white mb-1">
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="비밀번호"
            />
          </div>

          {message && <p className="text-red-500 text-sm">{message}</p>}

          <button
            type="submit"
            className="w-1/2 p-4 bg-white text-black rounded-full hover:bg-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            로그인하기
          </button>
        </form>
      </div>
    </div>
  );
}
