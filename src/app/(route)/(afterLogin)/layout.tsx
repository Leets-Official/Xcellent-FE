import { ReactNode } from 'react';
import Image from 'next/image';
import { AiFillHome } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoNotifications } from 'react-icons/io5';
import { RiMailLine } from 'react-icons/ri';
import { BsListCheck } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';

type Props = { children: ReactNode };

export default function AfterLoginLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* 왼쪽 고정 메뉴 */}
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
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </g>
            </svg>
          </div>

          {/* 네비게이션 메뉴 */}
          <nav className="flex-1">
            <ul className="space-y-4">
              <li>
                <a
                  href="/home"
                  className="flex items-center gap-4 text-xl hover:bg-gray-900 px-4 py-3 rounded-full"
                >
                  <AiFillHome className="w-7 h-7" />
                  <span>홈</span>
                </a>
              </li>
              <li>
                <a
                  href="/explore"
                  className="flex items-center gap-4 text-xl hover:bg-gray-900 px-4 py-3 rounded-full"
                >
                  <BiSearch className="w-7 h-7" />
                  <span>탐색하기</span>
                </a>
              </li>
              <li>
                <a
                  href="/notifications"
                  className="flex items-center gap-4 text-xl hover:bg-gray-900 px-4 py-3 rounded-full"
                >
                  <IoNotifications className="w-7 h-7" />
                  <span>알림</span>
                </a>
              </li>
              <li>
                <a
                  href="/messages"
                  className="flex items-center gap-4 text-xl hover:bg-gray-900 px-4 py-3 rounded-full"
                >
                  <RiMailLine className="w-7 h-7" />
                  <span>쪽지</span>
                </a>
              </li>
              <li>
                <a
                  href="/lists"
                  className="flex items-center gap-4 text-xl hover:bg-gray-900 px-4 py-3 rounded-full"
                >
                  <BsListCheck className="w-7 h-7" />
                  <span>리스트</span>
                </a>
              </li>
              <li>
                <a
                  href="/profile"
                  className="flex items-center gap-4 text-xl hover:bg-gray-900 px-4 py-3 rounded-full"
                >
                  <CgProfile className="w-7 h-7" />
                  <span>프로필</span>
                </a>
              </li>
            </ul>
          </nav>

          {/* 게시하기 버튼 */}
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 px-6 text-lg font-bold">
            게시하기
          </button>

          {/* 사용자 프로필 섹션 */}
          <div className="mt-4 p-4 hover:bg-gray-900 rounded-full cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden">
                <Image
                  src="/profile-placeholder.png"
                  alt="Profile"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <div className="font-bold">사용자 이름</div>
                <div className="text-gray-500">@username</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 ml-72 p-4">{children}</main>
    </div>
  );
}
