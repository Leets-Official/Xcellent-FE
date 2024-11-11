'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import Link from 'next/link';
import { ReactNode } from 'react';

type Props = { children: ReactNode; modal: ReactNode };
export default function AfterLoginLayout({ children, modal }: Props) {
  const segment = useSelectedLayoutSegment();
  const me = {
    id: 'dahyeon', // 임시 사용자 ID
  };

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

          {/* 네비게이션 메뉴 */}
          <nav className="flex-1">
            <ul className="space-y-4">
              <li>
                <Link href="/home">
                  <div
                    className={`flex items-center gap-4 text-xl px-4 py-3 rounded-full ${segment === 'home' ? 'font-bold bg-gray-900' : 'hover:bg-gray-900'}`}
                  >
                    <span>홈</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/explore">
                  <div
                    className={`flex items-center gap-4 text-xl px-4 py-3 rounded-full ${segment === 'explore' ? 'font-bold bg-gray-900' : 'hover:bg-gray-900'}`}
                  >
                    <span>탐색하기</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/notifications">
                  <div
                    className={`flex items-center gap-4 text-xl px-4 py-3 rounded-full ${segment === 'notifications' ? 'font-bold bg-gray-900' : 'hover:bg-gray-900'}`}
                  >
                    <span>알림</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/messages">
                  <div
                    className={`flex items-center gap-4 text-xl px-4 py-3 rounded-full ${segment === 'messages' ? 'font-bold bg-gray-900' : 'hover:bg-gray-900'}`}
                  >
                    <span>쪽지</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/lists">
                  <div
                    className={`flex items-center gap-4 text-xl px-4 py-3 rounded-full ${segment === 'lists' ? 'font-bold bg-gray-900' : 'hover:bg-gray-900'}`}
                  >
                    <span>리스트</span>
                  </div>
                </Link>
              </li>
              {me?.id && (
                <li>
                  <Link href={`/${me?.id}`}>
                    <div
                      className={`flex items-center gap-4 text-xl px-4 py-3 rounded-full ${segment === me.id ? 'font-bold bg-gray-900' : 'hover:bg-gray-900'}`}
                    >
                      <span>프로필</span>
                    </div>
                  </Link>
                </li>
              )}
            </ul>
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
                  <div className="font-bold">사용자 이름</div>
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
