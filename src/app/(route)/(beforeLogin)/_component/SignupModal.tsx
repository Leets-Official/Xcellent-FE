'use client';

import { useFormState } from 'react-dom';
import onSubmit from '../_lib/signup';
import { useState } from 'react';

export default function SignupModal() {
  const [state, formAction] = useFormState(onSubmit, { message: null });
  console.log('state', state);

  /*생년월일 상태관리 */
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i,
  );
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleBirthDateChange = () => {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };
  return (
    <form action={formAction}>
      <div>
        <div>
          <label className="text-white" htmlFor="email">
            이메일
            <input
              id="email"
              name="email"
              type="text"
              placeholder=""
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
              placeholder=""
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
            placeholder=""
            required
          />
        </div>
        <div>
          <label className="text-white" htmlFor="customId">
            아이디
            <input id="customId" name="customId" required type="text" />
          </label>
        </div>
        <div>
          <label className="text-white" htmlFor="phoneNumber">
            핸드폰번호
            <input id="phoneNumber" name="phoneNumber" required type="text" />
          </label>
        </div>
        <div>
          <label className="text-white" htmlFor="birth">
            생년월일
            <div className="flex">
              <select
                id="month"
                name="month"
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
                id="day"
                name="day"
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
                id="year"
                name="year"
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
