'use client';

import { Login } from '@/app/api/auth/auth';
import { useRouter } from 'next/navigation';
import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';

export default function LoginModal() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    message: '',
  });

  const [loginSuccess, setLoginSuccess] = useState(false);
  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data,
      [name]: value,
    }));
  };

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
        setLoginSuccess(true);
      }
    } catch (err) {
      console.error(err);
      setFormData(data => ({
        ...data,
        message: '로그인 중 오류가 발생했습니다.',
      }));
    }

    useEffect(() => {
      if (loginSuccess) {
        router.replace('/home');
      }
    }, [loginSuccess, router]);
    return (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
        style={{ backgroundColor: 'rgba(104, 132, 145, 0.413)' }}
      >
        <div className="bg-black p-6 rounded-lg max-w-sm w-full text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">
            로그인하세요
          </h2>

          <form onSubmit={onSubmit} className="space-y-4">
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
                placeholder="이메일 입력"
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
                placeholder="비밀번호 입력"
              />
            </div>

            {formData.message && (
              <p className="text-red-500 text-sm">{formData.message}</p>
            )}

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
  };
}
