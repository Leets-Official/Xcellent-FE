'use client';

import { useState, useEffect } from 'react';
import { SignUp } from '@/app/api/auth/auth';
import { useRouter } from 'next/navigation';

export default function SignupModal() {
  const router = useRouter();

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
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-gray-800 rounded-lg"
    >
      <div className="space-y-2">
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
        >
          <g>
            <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z" />
          </g>
        </svg>
        <label className="text-white" htmlFor="email">
          이메일
        </label>
        <input
          id="email"
          name="email"
          type="text"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="이메일을 입력하세요"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="space-y-2">
        <label className="text-white" htmlFor="name">
          이름
        </label>
        <input
          id="userName"
          name="userName"
          type="text"
          value={formData.userName}
          onChange={handleInputChange}
          placeholder="이름"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="space-y-2">
        <label className="text-white" htmlFor="password">
          비밀번호
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder=""
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="space-y-2">
        <label className="text-white" htmlFor="customId">
          아이디
        </label>
        <input
          id="customId"
          name="customId"
          value={formData.customId}
          onChange={handleInputChange}
          required
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="space-y-2">
        <label className="text-white" htmlFor="phoneNumber">
          핸드폰번호
        </label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="space-y-2">
        <label className="text-white" htmlFor="birth">
          생년월일
        </label>
        <div className="flex space-x-2">
          {/* 월 */}
          <select
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
            id="month"
            value={birthDate.month}
            onChange={e => handleDateChange('month', e.target.value)}
            required
          >
            <option value="">월</option>
            {months.map(m => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          {/* 일 */}
          <select
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
            id="day"
            value={birthDate.day}
            onChange={e => handleDateChange('day', e.target.value)}
            required
          >
            <option value="">일</option>
            {days.map(d => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* 년 */}
          <select
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
            id="year"
            value={birthDate.year}
            onChange={e => handleDateChange('year', e.target.value)}
            required
          >
            <option value="">연도</option>
            {years.map(y => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        가입하기
      </button>
    </form>
  );
}
