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

  // 달에 따라 일 수를 동적으로 설정
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
    <form onSubmit={handleSubmit}>
      <div>
        <div>
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
          />
        </div>
        <div>
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
          />
        </div>
        <div>
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
          />
        </div>
        <div>
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
          />
        </div>
        <div>
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
          />
        </div>
        <div>
          <label className="text-white" htmlFor="birth">
            생년월일
          </label>
          <div className="flex">
            {/* 월 */}
            <select
              className="text-black"
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
              className="text-black"
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
              className="text-black"
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
      </div>
      <button type="submit" className="bg-white">
        가입하기
      </button>
    </form>
  );
}
