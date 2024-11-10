'use client';
import React, { useState, useRef } from 'react';
import { AiOutlinePicture } from 'react-icons/ai';

interface PostFormProps {
  onPostSubmit: (content: string, images: string[]) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onPostSubmit }) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && selectedImages.length + files.length <= 4) {
      const newImages = Array.from(files).map(file =>
        URL.createObjectURL(file),
      );
      setSelectedImages(prev => [...prev, ...newImages]);
    } else {
      alert('이미지는 최대 4개까지만 업로드할 수 있습니다.');
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handlePost = () => {
    if (textareaRef.current) {
      onPostSubmit(textareaRef.current.value.trim() || '', selectedImages);
      textareaRef.current.value = ''; // 텍스트 초기화
    }
    setSelectedImages([]); // 이미지 초기화
  };

  return (
    <div className="bg-black p-4 border-b border-gray-700 mb-4 max-w-xl mx-auto text-white">
      <div className="flex items-start space-x-3">
        {/* 프로필 이미지 자리 */}
        <div className="w-12 h-12 bg-gray-600 rounded-full"></div>

        {/* 텍스트 입력 필드 */}
        <textarea
          ref={textareaRef}
          placeholder="What is happening?!"
          className="w-full p-2 bg-black text-lg placeholder-gray-500 border-none focus:outline-none resize-none"
          onInput={handleResize}
          style={{ minHeight: '50px' }}
        />
      </div>

      {/* 이미지 미리보기 */}
      {selectedImages.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mt-3">
          {selectedImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Preview ${index + 1}`}
                className="rounded-lg"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-black rounded-full p-1 text-white"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 하단 아이콘 및 버튼 */}
      <div className="flex justify-between items-center mt-3">
        <div className="flex space-x-4 text-blue-500">
          {/* 이미지 업로드 아이콘 */}
          <label htmlFor="image-upload" className="cursor-pointer">
            <AiOutlinePicture size={24} />
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
        </div>

        {/* 게시 버튼 */}
        <button
          onClick={handlePost}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full py-2 px-4 font-semibold"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default PostForm;
