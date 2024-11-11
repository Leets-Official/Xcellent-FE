'use client';

import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { getProfileInfo } from '@/app/api/user/user';
import SideBar from './_component/Sidebar';

type Props = { children: ReactNode; modal: ReactNode };
export default function AfterLoginLayout({ children, modal }: Props) {
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

  return (
    <div className="flex min-h-screen bg-black text-white">
      <aside className="fixed w-72 h-screen border-r border-gray-700">
        <div className="flex flex-col h-full p-4">
          {/* 로고 섹션 */}
          <div className="p-4">
            <svg
              viewBox="0 0 24 24"
              className="h-8 w-8 text-white"
              fill="currentColor"
            >
              <g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
              </g>
            </svg>
          </div>

          <nav>
            <SideBar />
          </nav>
          {/* 게시하기 버튼 */}
          <button
            type="button"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 px-6 text-lg font-bold"
          >
            게시하기
          </button>

          {/* 사용자 프로필 섹션 */}
          <div className="mt-4 p-4 hover:bg-gray-900 rounded-full cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden">
                <div>
                  <div className="font-bold text-white">사용자 이름</div>
                  <div className="text-gray-500">@username</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* 메인 콘텐츠 영역 */}

      <main className="flex-1 ml-72 p-4 relative">{children}</main>
    </div>
  );
}
