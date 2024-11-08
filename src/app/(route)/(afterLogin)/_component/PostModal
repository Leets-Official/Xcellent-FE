import React, { useState, useRef } from 'react';
import { FaImage } from 'react-icons/fa'; // FaImage 아이콘만 남김

// Post와 Comment 인터페이스 정의
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
  comments: Comment[]; // 댓글 배열로 변경
  isLiked: boolean;
}

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostSubmit: (post: Post) => void;
}

const PostModal: React.FC<PostModalProps> = ({
  isOpen,
  onClose,
  onPostSubmit,
}) => {
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]); // 이미지 배열 상태 추가
  const fileInputRef = useRef<HTMLInputElement | null>(null); // 파일 입력 요소 참조

  if (!isOpen) return null;

  const handleSubmit = () => {
    const newPost: Post = {
      id: Date.now(),
      author: 'Myself',
      authorImage: '/profile-placeholder.png',
      content,
      images, // 이미지 배열 상태 사용
      likes: 0,
      retweets: 0,
      comments: [], // 빈 댓글 배열로 초기화
      isLiked: false,
    };
    onPostSubmit(newPost);
    setContent('');
    setImages([]); // 이미지 배열 초기화
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && images.length < 4) {
      // 최대 4장의 이미지만 허용
      const files = Array.from(e.target.files);
      const imagesUrls = files.map(file => URL.createObjectURL(file));
      setImages([...images, ...imagesUrls]);
    }
  };

  const handleImageIconClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-gray-900 p-4 rounded-lg w-full max-w-lg">
        <h2 className="text-lg font-bold text-white mb-4">
          What's happening?!
        </h2>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="What's happening?!"
          className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded-md resize-none"
          rows={4}
        />
        <div className="flex items-center justify-between mt-4">
          {/* 이미지 아이콘을 클릭하면 파일 입력 요소가 클릭되도록 설정 */}
          <div
            className="flex space-x-4 text-blue-400"
            onClick={handleImageIconClick}
          >
            <FaImage size={20} />
          </div>
          {/* 파일 입력 요소는 숨김 처리 */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleImageChange}
            hidden
          />
          {/* 업로드된 이미지 미리보기 */}
          <div className="flex flex-wrap mt-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                className="w-10 h-10 object-cover mr-2 mb-2"
              />
            ))}
          </div>
          {/* Buttons for cancel and post */}
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="bg-gray-700 text-white p-2 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white p-2 rounded-md"
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
