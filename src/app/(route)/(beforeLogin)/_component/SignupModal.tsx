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

  const [formErrors, setFormErrors] = useState({
    email: '',
    userName: '',
  });

  const [days, setDays] = useState(Array.from({ length: 31 }, (_, i) => i + 1));
  const years = Array.from(
    { length: 80 },
    (_, i) => new Date().getFullYear() - i,
  );
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  useEffect(() => {
    const getDaysInMonth = (month: number, year: number) => {
      if (month === 2) return year % 4 === 0 ? 29 : 28;
      if ([4, 6, 9, 11].includes(month)) return 30;
      return 31;
    };
    setDays(
      Array.from(
        { length: getDaysInMonth(birthDate.month, birthDate.year) },
        (_, i) => i + 1,
      ),
    );
  }, [birthDate.month, birthDate.year]);

  const inputFields = [
    {
      id: 'email',
      name: 'email',
      type: 'text',
      placeholder: '이메일',
      error: formErrors.email,
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      errorMessage: '올바른 이메일 형식을 입력하세요.',
    },
    {
      id: 'userName',
      name: 'userName',
      type: 'text',
      placeholder: '이름',
      error: formErrors.userName,
      regex: /^[A-Za-z]+$/,
      errorMessage: '이름은 영문으로 입력해주세요.',
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
      placeholder: '비밀번호',
    },
    {
      id: 'customId',
      name: 'customId',
      type: 'text',
      placeholder: '아이디',
    },
    {
      id: 'phoneNumber',
      name: 'phoneNumber',
      type: 'text',
      placeholder: '휴대폰',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const field = inputFields.find(f => f.name === name);
    if (field?.regex) {
      setFormErrors({
        ...formErrors,
        [name]: field.regex.test(value) ? '' : field.errorMessage,
      });
    }
  };

  const handleDateChange = (type: string, value: string) => {
    setBirthDate(prevDate => ({ ...prevDate, [type]: value }));
    setFormData(prevData => ({
      ...prevData,
      [`userBirth${type.charAt(0).toUpperCase() + type.slice(1)}`]: parseInt(
        value,
        10,
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await SignUp(formData);
      alert('회원가입이 완료되었습니다');
      router.push('/login');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('예기치 못한 오류가 발생했습니다.');
      }
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
            <p className="text-white text-3xl font-bold">계정을 생성하세요</p>
            {inputFields.map(field => (
              <div key={field.id} className="space-y-2">
                <input
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleInputChange}
                  placeholder={field.placeholder}
                  required
                  className="w-80 p-4 bg-transparent text-white border border-gray-500 rounded-md focus:outline-none focus:border-3 focus:border-sky-400"
                />
                {field.error && (
                  <p className="text-red-500 text-sm">{field.error}</p>
                )}
              </div>
            ))}
            <div className="text-white font-semibold">생년월일</div>
            <div className="flex space-x-2">
              <select
                className="w-40 p-4 bg-transparent text-white border border-gray-300 rounded-md"
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
              <select
                className="w-1/8 p-4 bg-transparent text-white border border-gray-300 rounded-md"
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
              <select
                className="w-1/7 p-4 bg-transparent text-white border border-gray-300 rounded-md"
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
            <button
              type="submit"
              className="w-1/2 p-4 bg-white text-black rounded-full hover:bg-zinc-300"
            >
              가입하기
            </button>
          </div>
        </form>
      </div>
    )
  );
}
