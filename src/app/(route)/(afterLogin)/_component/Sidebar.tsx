'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AiFillHome } from 'react-icons/ai';
import { RiMailLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { FaFeatherAlt } from 'react-icons/fa';

interface SidebarProps {
  onPostButtonClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onPostButtonClick }) => {
  return (
    <aside className="flex-shrink-0 w-64 h-screen border-r border-gray-700 bg-black">
      <div className="flex flex-col h-full p-4">
        <div className="p-4">
          <svg
            viewBox="0 0 24 24"
            className="h-8 w-8 text-white"
            fill="currentColor"
          >
            <g>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </g>
          </svg>
        </div>
        <nav className="flex-1">
          <ul className="space-y-4">
            <li>
              <Link
                href="/home"
                className="flex items-center gap-4 text-xl hover:bg-gray-800 px-4 py-3 rounded-full"
              >
                <AiFillHome className="w-7 h-7" />
                <span>홈</span>
              </Link>
            </li>
            <li>
              <Link
                href="/messages"
                className="flex items-center gap-4 text-xl hover:bg-gray-800 px-4 py-3 rounded-full"
              >
                <RiMailLine className="w-7 h-7" />
                <span>쪽지</span>
              </Link>
            </li>
            <li>
              <Link
                href="/profile"
                className="flex items-center gap-4 text-xl hover:bg-gray-800 px-4 py-3 rounded-full"
              >
                <CgProfile className="w-7 h-7" />
                <span>프로필</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* 게시하기 버튼 */}
        <button
          onClick={onPostButtonClick}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 px-6 text-lg font-bold flex items-center justify-center gap-2"
        >
          <FaFeatherAlt className="w-5 h-5" />
          <span>게시하기</span>
        </button>

        {/* 사용자 정보 */}
        <div className="mt-auto p-4 hover:bg-gray-800 rounded-full cursor-pointer">
          <div className="flex items-center gap-[10px]">
            {/* 프로필 이미지 */}
            <Image
              src="/profile-placeholder.png"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
            {/* 사용자 이름 및 아이디 */}
            <div>
              사용자 이름
              <br />
              @username
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
