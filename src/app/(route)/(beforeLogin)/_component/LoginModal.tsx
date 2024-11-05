'use client';

import { useState } from 'react';
import { Login } from '@/app/api/auth/auth';
import { useRouter } from 'next/navigation';

export default function LoginModal() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleClose = () => {
    router.back(); // 모달 닫을 때 이전 페이지로 돌아가기
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

        console.log('accessToken:', data.result.accessToken);
        console.log('refreshToken:', data.result.refreshToken);

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

        <button
          onClick={handleClose} // 닫기 버튼 클릭 시 이전 페이지로 이동
          className="mt-4 text-white"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
