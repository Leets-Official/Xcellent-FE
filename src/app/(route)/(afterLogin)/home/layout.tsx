'use client';

import { ReactNode, useState } from 'react';
import Sidebar from '@/app/(route)/(afterLogin)/_component/Sidebar';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface HomeLayoutProps {
  children: ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postContent, setPostContent] = useState('');

  // 임시 사용자 데이터 설정
  const me = { id: 'dahyeon' }; // 사용자 ID

  const handlePostButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePostContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  const handlePostSubmit = () => {
    if (postContent.trim()) {
      console.log('게시글 작성:', postContent);
      setPostContent('');
      setIsModalOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar onPostButtonClick={handlePostButtonClick} />
      <main className="flex-1 ml-64">
        {/* 프로필 링크 */}
        <Link href={`/${me.id}`} legacyBehavior>
          <a className="text-blue-500 hover:underline">프로필</a>
        </Link>
        {children}
      </main>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">게시글 작성</h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <textarea
              className="w-full h-32 p-2 border border-gray-300 rounded mb-4"
              placeholder="무슨 일이 일어나고 있나요?"
              value={postContent}
              onChange={handlePostContentChange}
            />
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded mr-2"
              >
                닫기
              </button>
              <button
                onClick={handlePostSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                게시하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeLayout;
