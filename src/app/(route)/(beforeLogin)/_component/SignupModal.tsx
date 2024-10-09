'use client';

import { useState } from 'react';
import { SignUp } from '@/app/api/auth/auth';
import { useRouter } from 'next/navigation';

export default function SignupModal() {
  const router = useRouter();

  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    userName: '',
    password: '',
    customId: '',
    phoneNumber: '',
  });
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i,
  );
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleBirthDateChange = () => {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.targt.value });
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
            <input
              id="email"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="이메일을 입력하세요"
              required
            />
          </label>
        </div>
        <div>
          <label className="text-white" htmlFor="name">
            이름
            <input
              id="userName"
              name="userName"
              type="text"
              value={formData.userName}
              onChange={handleInputChange}
              placeholder="이름"
              required
            />
          </label>
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
            <input
              id="customId"
              name="customId"
              value={formData.customId}
              onChange={handleInputChange}
              required
              type="text"
            />
          </label>
        </div>
        <div>
          <label className="text-white" htmlFor="phoneNumber">
            핸드폰번호
            <input
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              type="text"
            />
          </label>
        </div>
        <div>
          <label className="text-white" htmlFor="birth">
            생년월일
            <div className="flex">
              <select
                className="text-black"
                id="month"
                value={month}
                onChange={e => setMonth(e.target.value)}
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
                value={day}
                onChange={e => setDay(e.target.value)}
                required
              >
                <option value="">일</option>
                {days.map(d => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              {/*연도 */}
              <select
                className="text-black"
                id="year"
                value={year}
                onChange={e => setYear(e.target.value)}
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
            <input
              id="userBirthDay"
              name="userBirthDay"
              required
              type="hidden"
              value={handleBirthDateChange()}
            />
          </label>
        </div>
      </div>
      <div>
        <button type="submit" className="bg-white">
          가입하기
        </button>
      </div>
    </form>
  );
}
