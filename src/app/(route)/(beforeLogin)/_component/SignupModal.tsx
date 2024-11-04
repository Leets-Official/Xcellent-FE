'use client';

import { useState, useEffect } from 'react';
import { SignUp } from '@/app/api/auth/auth';
import { useRouter } from 'next/navigation';

export default function SignupModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => {
    setIsOpen(false);
    router.back();
  };

  const [birthDate, setBirthDate] = useState({
    month: 0,
    day: 0,
    year: 0,
  });

  const [formData, setFormData] = useState({
    email: '',
    userName: '',
    password: '',
    customId: '',
    phoneNumber: '',
    userBirthDay: 0,
    userBirthMonth: 0,
    userBirthYear: 0,
  });

  const [days, setDays] = useState(Array.from({ length: 31 }, (_, i) => i + 1));
  const years = Array.from(
    { length: 80 },
    (_, i) => new Date().getFullYear() - i,
  );
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  useEffect(() => {
    const { month, year } = birthDate;

    if (month) {
      const getDaysInMonth = (month, year) => {
        if (month === 2) {
          return 29;
        }
        if ([4, 6, 9, 11].includes(month)) return 30;

        return 31;
      };

      setDays(
        Array.from({ length: getDaysInMonth(month, year) }, (_, i) => i + 1),
      );
    }
  }, [birthDate.month, birthDate.year]);
  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (type, value) => {
    setBirthDate(prevDate => ({ ...prevDate, [type]: value }));
    setFormData(prevData => ({
      ...prevData,
      [`userBirth${type.charAt(0).toUpperCase() + type.slice(1)}`]: parseInt(
        value,
        10,
      ),
    }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await SignUp(formData);
      alert('회원가입이 완료되었습니다');
      router.push('/login');
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    isOpen && (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
        style={{ backgroundColor: 'rgba(104, 132, 145, 0.413)' }}
      >
        <form
          onSubmit={handleSubmit}
          className=" bg-black rounded-xl p-6 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-xl"
        >
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
          <div className="flex flex-col justify-center items-center gap-5">
            <p className="text-white text-3xl font-bold">계정을 생성하세요</p>
            <div className="space-y-2">
              <input
                id="email"
                name="email"
                type="text"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="이메일"
                required
                className="w-80 p-4 bg-transparent text-white border border-gray-500 rounded-md focus:outline-none focus:border-3  focus:border-sky-400 "
              />
            </div>
            <div className="space-y-2">
              <input
                id="userName"
                name="userName"
                type="text"
                value={formData.userName}
                onChange={handleInputChange}
                placeholder="이름"
                required
                className="w-80 p-4 bg-transparent text-white border border-gray-500 rounded-md focus:outline-none focus:border-3  focus:border-sky-400"
              />
            </div>
            <div className="space-y-2">
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="비밀번호"
                required
                className="w-80 p-4 bg-transparent text-white border border-gray-500 rounded-md focus:outline-none focus:border-3  focus:border-sky-400"
              />
            </div>
            <div className="space-y-2">
              <input
                id="customId"
                name="customId"
                value={formData.customId}
                onChange={handleInputChange}
                placeholder="아이디"
                required
                type="text"
                className="w-80 bg-transparent text-white p-4 border border-gray-500 rounded-md focus:outline-none focus:border-3  focus:border-sky-400"
              />
            </div>
            <div className="space-y-2">
              <input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="휴대폰"
                required
                type="text"
                className="w-80 p-4 bg-transparent text-white border border-gray-500 rounded-md focus:outline-none focus:border-3  focus:border-sky-400"
              />
            </div>
            <div className="text-white font-semibold ">생년월일</div>
            <div className="space-y-2">
              <div className="flex space-x-2">
                {/* 월 */}
                <select
                  className="w-40 p-4 bg-transparent text-white border border-gray-300 rounded-md focus:outline-none focus:border-3  focus:border-sky-400"
                  id="month"
                  value={birthDate.month}
                  onChange={e => handleDateChange('month', e.target.value)}
                  required
                >
                  <option value="" className="bg-black">
                    월
                  </option>
                  {months.map(m => (
                    <option key={m} value={m} className="bg-black">
                      {m}
                    </option>
                  ))}
                </select>

                {/* 일 */}
                <select
                  className="w-1/8 p-4 bg-transparent text-white border border-gray-300 rounded-md focus:outline-none focus:border-3  focus:border-sky-400 text-black"
                  id="day"
                  value={birthDate.day}
                  onChange={e => handleDateChange('day', e.target.value)}
                  required
                >
                  <option value="" className="bg-black">
                    일
                  </option>
                  {days.map(d => (
                    <option key={d} value={d} className="bg-black">
                      {d}
                    </option>
                  ))}
                </select>

                {/* 년 */}
                <select
                  className="w-1/7 p-4 bg-transparent text-white border border-gray-300 rounded-md focus:outline-none focus:border-3  focus:border-sky-400 text-black"
                  id="year"
                  value={birthDate.year}
                  onChange={e => handleDateChange('year', e.target.value)}
                  required
                >
                  <option value="" className="bg-black">
                    년
                  </option>
                  {years.map(y => (
                    <option key={y} value={y} className="bg-black">
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-1/2 p-4 bg-white text-black rounded-full hover:bg-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              가입하기
            </button>
          </div>
        </form>
      </div>
    )
  );
}
