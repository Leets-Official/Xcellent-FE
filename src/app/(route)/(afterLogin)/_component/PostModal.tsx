'use client';

import { useState, useRef } from 'react';
import { FaImage } from 'react-icons/fa';

interface Comment {
  id: number;
  content: string;
  author: string;
  authorImage: string;
  createdAt: string;
}

interface Post {
  id: number;
  author: string;
  authorImage: string;
  content: string;
  images: string[];
  likes: number;
  retweets: number;
  comments: Comment[];
  isLiked: boolean;
}

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostSubmit: (content: string, images: string[]) => void; // 게시글 작성 시 호출할 함수
}

const PostModal: React.FC<PostModalProps> = ({
  isOpen,
  onClose,
  onPostSubmit,
}) => {
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null; // 모달이 열리지 않으면 렌더링하지 않음

  const handleSubmit = () => {
    onPostSubmit(content, images); // 부모 컴포넌트로 게시글 내용과 이미지를 전달
    setContent(''); // 입력 필드 초기화
    setImages([]); // 이미지 배열 초기화
    onClose(); // 모달 닫기
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && images.length < 4) {
      const files = Array.from(e.target.files);
      const newImages = files.map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
    e.target.value = ''; // 파일 입력 초기화
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-gray-900 p-4 rounded-lg w-full max-w-lg">
        <h2 className="text-lg font-bold text-white mb-4">
          What's happening?!
        </h2>

        {/* 텍스트 입력 필드 */}
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="What's happening?!"
          className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded-md resize-none"
          rows={4}
        />

        {/* 이미지 업로드 및 미리보기 */}
        <div className="flex items-center justify-between mt-4">
          {/* 이미지 업로드 아이콘 */}
          <FaImage size={20} onClick={() => fileInputRef.current?.click()} />

          {/* 파일 입력 요소 숨김 처리 */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />

          {/* 업로드된 이미지 미리보기 */}
          {images.length > 0 && (
            <div className="flex flex-wrap mt-2">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-[40px] h-[40px] object-cover mr-[10px]"
                />
              ))}
            </div>
          )}

          {/* 취소 및 게시 버튼 */}
          <div className="flex space-x-[10px]">
            <button
              onClick={onClose}
              className="bg-gray-[700] text-white p-[10px] rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-[500] text-white p-[10px] rounded-md"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
