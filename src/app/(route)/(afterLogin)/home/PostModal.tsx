'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface PostModalProps {
  onSubmit: (content: string) => void;
}

const PostModal: React.FC<PostModalProps> = ({ onSubmit }) => {
  const [postContent, setPostContent] = useState('');
  const [isClient, setIsClient] = useState(false);
  const router = useRouter(); // 클라이언트에서만 사용할 수 있음

  useEffect(() => {
    setIsClient(true); // 클라이언트에서만 렌더링
  }, []);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  const handleSubmit = () => {
    if (postContent.trim()) {
      onSubmit(postContent);
      setPostContent('');
      router.back(); // 라우터가 준비되었을 때 동작
    }
  };

  if (!isClient) {
    return null; // 클라이언트에서만 렌더링
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => router.back()}
        >
          ×
        </button>
        <textarea
          className="w-full h-32 p-2 border border-gray-300 rounded mb-4"
          placeholder="무슨 일이 일어나고 있나요?"
          value={postContent}
          onChange={handleContentChange}
        />
        <div className="flex justify-end">
          <button
            onClick={() => router.back()}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded mr-2"
          >
            닫기
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            게시하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
