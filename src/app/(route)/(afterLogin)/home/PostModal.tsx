import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PostModalProps {
  isOpen: boolean;
  onSubmit: (content: string) => void;
  onClose: () => void;
}

export default function PostModal({
  isOpen,
  onSubmit,
  onClose,
}: PostModalProps) {
  const [postContent, setPostContent] = useState('');
  const router = useRouter();

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  const handleSubmit = () => {
    if (postContent.trim()) {
      onSubmit(postContent);
      setPostContent('');
      router.back();
    }
  };

  if (!isOpen) {
    return null; // isOpen이 false일 때 모달을 렌더링하지 않음
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg w-96 relative">
        <button
          type="button"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
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
            type="button"
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded mr-2"
          >
            닫기
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            게시하기
          </button>
        </div>
      </div>
    </div>
  );
}
