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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await Login(formData);
      if (!res.ok) {
        const errorData = await res.json();
        if (errorData.code === 401) {
          setMessage('이메일과 비밀번호가 일치하지 않습니다.');
        } else if (errorData.code === 404) {
          setMessage('존재하지 않는 유저입니다.');
        } else {
          setMessage('로그인 중 오류가 발생하였습니다.');
        }
      } else {
        const data = await res.json();

        localStorage.setItem('accessToken', data.result.accessToken);
        localStorage.setItem('refreshToken', data.result.refreshToken);

        alert('로그인에 성공했습니다.');
        router.replace('/home');
      }
    } catch (err) {
      console.error(err);
      setMessage('로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    isOpen && (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
        style={{ backgroundColor: 'rgba(104, 132, 145, 0.413)' }}
      >
        <form
          onSubmit={onSubmit}
          className="bg-black rounded-xl p-6 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-xl"
        >
          <button
            type="button"
            onClick={handleClose}
            aria-label="닫기"
            className="hover:bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="fill-white"
            >
              <g>
                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z" />
              </g>
            </svg>
          </button>
          <div className="flex flex-col justify-center items-center gap-5">
            <p className="text-white text-3xl font-bold">로그인하세요</p>
            <div className="space-y-2">
              <input
                id="email"
                name="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
                placeholder="이메일"
                required
                className="w-80 p-4 bg-transparent text-white border border-gray-500 rounded-md focus:outline-none focus:border-3 focus:border-sky-400"
              />
            </div>
            <div className="space-y-2">
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호"
                required
                className="w-80 p-4 bg-transparent text-white border border-gray-500 rounded-md focus:outline-none focus:border-3 focus:border-sky-400"
              />
            </div>
            {message && <p className="text-red-500 text-sm">{message}</p>}
            <button
              type="submit"
              className="w-1/2 p-4 bg-white text-black rounded-full hover:bg-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              로그인하기
            </button>
          </div>
        </form>
      </div>
    )
  );
}
