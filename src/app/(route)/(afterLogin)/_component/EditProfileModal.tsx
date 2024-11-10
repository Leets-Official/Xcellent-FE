'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditProfileModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    router.back();
  };

  const [formData, setFormData] = useState({
    userName: '',
    description: '',
    location: '',
    websiteUrl: '',
  });

  const [birthDate, setBirthDate] = useState({
    month: 0,
    day: 0,
    year: 0,
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

  const textareaFields = [
    {
      id: 'userName',
      name: 'userName',
      placeholder: 'Name',
      rows: 1,
    },
    {
      id: 'description',
      name: 'description',
      placeholder: 'Description',
      rows: 3,
    },
    {
      id: 'location',
      name: 'location',
      placeholder: 'Location',
      rows: 1,
    },
    {
      id: 'websiteUrl',
      name: 'websiteUrl',
      placeholder: 'Website URL',
      rows: 1,
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (type: string, value: string) => {
    setBirthDate(prevDate => ({ ...prevDate, [type]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert('프로필이 수정되었습니다.');
    router.back();
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
          <div className="flex justify-between items-center mb-4">
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
            <h2 className="text-xl font-bold text-white">Edit Profile</h2>
            <button
              type="submit"
              className="w-1/7 h-1 p-4 font-bold bg-white text-black flex items-center rounded-full hover:bg-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Save
            </button>
          </div>

          {/* 프로필 이미지, 배경 이미지 변경 하는 것도 추가해야함  */}
          <div className="flex flex-col gap-4">
            {textareaFields.map(field => (
              <div key={field.id} className="space-y-2">
                <textarea
                  id={field.id}
                  name={field.name}
                  placeholder={field.placeholder}
                  rows={field.rows}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-transparent text-white border border-gray-500 rounded-md focus:outline-none focus:border-3 focus:border-sky-400"
                />
              </div>
            ))}

            <div className="text-white font-semibold">Birth date</div>
            <div className="flex space-x-2">
              <select
                className="w-40 p-4 bg-transparent text-white border border-gray-500 rounded-md"
                value={birthDate.month}
                onChange={e => handleDateChange('month', e.target.value)}
                required
              >
                <option value="" className="bg-black">
                  Month
                </option>
                {months.map(m => (
                  <option key={m} value={m} className="bg-black">
                    {m}
                  </option>
                ))}
              </select>
              <select
                className="w-1/8 p-4 bg-transparent text-white border border-gray-500 rounded-md"
                value={birthDate.day}
                onChange={e => handleDateChange('day', e.target.value)}
                required
              >
                <option value="" className="bg-black">
                  Day
                </option>
                {days.map(d => (
                  <option key={d} value={d} className="bg-black">
                    {d}
                  </option>
                ))}
              </select>
              <select
                className="w-1/7 p-4 bg-transparent text-white border border-gray-500 rounded-md"
                value={birthDate.year}
                onChange={e => handleDateChange('year', e.target.value)}
                required
              >
                <option value="" className="bg-black">
                  Year
                </option>
                {years.map(y => (
                  <option key={y} value={y} className="bg-black">
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>
    )
  );
}
