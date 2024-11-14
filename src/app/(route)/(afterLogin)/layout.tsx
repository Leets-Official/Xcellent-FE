'use client';

import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { getProfileInfo } from '@/app/api/user/user';
import SideBar from './_component/Sidebar';
import { useRouter } from 'next/navigation';

type Props = { children: ReactNode; modal: ReactNode };

export default function AfterLoginLayout({ children, modal }: Props) {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('');
  const [customId, setCustomId] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string>('/profile.svg');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getProfileInfo();
        setUserName(userInfo.userName);
        setCustomId(userInfo.customId);
        if (userInfo.profileImageUrl) {
          setProfileImage(userInfo.profileImageUrl);
        }
      } catch (error) {
        console.error('Failed to fetch user info: ', error);
      }
    };

    fetchUserInfo();
  }, []);

  // 로그아웃 함수
  const handleLogout = () => {
    const confirmLogout = window.confirm('로그아웃하시겠습니까?');
    if (confirmLogout) {
      // 로그아웃 처리 (토큰 삭제)
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      // 첫 화면으로 이동
      router.push('/');
    }
  };

  return (
    <div className="flex bg-black text-white justify-center">
      {/* 왼쪽 사이드바 */}
      <header className="flex flex-col items-end w-20 sm:w-72 h-screen border-r border-gray-700 bg-black fixed left-0">
        <section className="w-full flex flex-col items-center sm:items-start h-full p-2 sm:p-4">
          <Link
            href="/home"
            className="flex justify-center w-12 h-12 rounded-full hover:bg-gray-900"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="w-9 h-9 fill-white"
            >
              <g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </g>
            </svg>
          </Link>

          <nav className="flex flex-1 flex-col mt-4">
            <SideBar />
          </nav>

          <button
            type="button"
            className="w-full bg-sky-500 hover:bg-sky- text-white rounded-full py-3 px-6 text-lg font-bold mt-4"
          >
            Post
          </button>

          <div
            className="flex items-center mt-6 p-2 w-12 sm:w-full rounded-full hover:bg-gray-900 cursor-pointer"
            onClick={handleLogout}
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-600 overflow-hidden">
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block ml-3">
              <div className="text-base font-bold text-white">{userName}</div>
              <div className="text-sm text-gray-500">@{customId}</div>
            </div>
          </div>
        </section>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 ml-20 sm:ml-72 p-4 relative max-w-screen-lg mx-auto">
        {children}
      </main>
    </div>
  );
}
