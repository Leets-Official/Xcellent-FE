'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditProfileModal({ profileData }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    router.back();
  };

  const [formData, setFormData] = useState({
    email: profileData.email || '',
    userName: profileData.userName || '',
    customId: profileData.customId || '',
    phoneNumber: profileData.phoneNumber || '',
    description: profileData.description || '',
    location: profileData.location || '',
    userBirthDay: profileData.userBirthDay || 0,
    userBirthMonth: profileData.userBirthMonth || 0,
    userBirthYear: profileData.userBirthYear || 0,
  });

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Update profile API 호출
      alert('프로필이 업데이트되었습니다');
      router.push('/profile');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
        <form
          onSubmit={handleSubmit}
          className="bg-black rounded-xl p-6 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-xl"
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
              className="fill-white"
            >
              <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z" />
            </svg>
          </button>
          <div className="flex flex-col justify-center items-center gap-5">
            <p className="text-white text-3xl font-bold">Edit Profile</p>
            <div className="space-y-2">
              <input
                id="userName"
                name="userName"
                type="text"
                value={formData.userName}
                onChange={handleInputChange}
                placeholder="이름"
                required
                className="w-80 p-4 bg-transparent text-white border border-gray-500 rounded-md focus:outline-none focus:border-sky-400"
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
                className="w-80 bg-transparent text-white p-4 border border-gray-500 rounded-md focus:outline-none focus:border-sky-400"
              />
            </div>
            <div className="space-y-2">
              <input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Bio"
                type="text"
                className="w-80 p-4 bg-transparent text-white border border-gray-500 rounded-md focus:outline-none focus:border-sky-400"
              />
            </div>
            <div className="space-y-2">
              <input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Location"
                type="text"
                className="w-80 p-4 bg-transparent text-white border border-gray-500 rounded-md focus:outline-none focus:border-sky-400"
              />
            </div>
            <button
              type="submit"
              className="w-1/2 p-4 bg-white text-black rounded-full hover:bg-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    )
  );
}
