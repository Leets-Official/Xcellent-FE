'use client';

import { createArticleAPI } from '@/app/api/article/article';
import React, { useState, useRef } from 'react';
import { BsCardImage } from 'react-icons/bs';
import { IoMdSend } from 'react-icons/io';
import Image from 'next/image';

export default function PostForm() {
  const [selectedImages, setSelectedImages] = useState<File[]>([]); // File 객체 배열로 변경
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && selectedImages.length + files.length <= 4) {
      const newImages = Array.from(files);
      setSelectedImages(prev => [...prev, ...newImages]);
    } else {
      alert('이미지는 최대 4개까지만 업로드할 수 있습니다.');
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handlePost = async () => {
    if (textareaRef.current) {
      const content = textareaRef.current.value.trim();
      if (!content && selectedImages.length === 0) {
        alert('내용 또는 이미지를 입력해주세요.');
        return;
      }
      try {
        await createArticleAPI(content, selectedImages);
        // console.log('Fetched user info: ', userInfo);
      } catch (error) {
        console.error('Error: ', error);
      }
    }
  };

  return (
    <div className="bg-black p-4 border-b border-gray-700 mb-4 w-full mx-auto text-white">
      <div className="flex items-start space-x-3">
        {/* 프로필 이미지 자리 */}
        <div className="w-12 h-12 bg-gray-600 rounded-full"> 프로필 </div>

        {/* 텍스트 입력 필드 */}
        <textarea
          ref={textareaRef}
          placeholder="What is happening?!"
          className="w-full p-2 bg-black text-lg placeholder-gray-500 border-none focus:outline-none resize-none"
          style={{ minHeight: '50px' }}
        />
      </div>

      {/* 이미지 미리보기 */}
      {selectedImages.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mt-3">
          {selectedImages.map((image, index) => (
            <div key={index} className="relative">
              <Image
                src={URL.createObjectURL(image)} // 미리보기 URL 생성
                alt={`Preview ${index + 1}`}
                layout="responsive"
                width={200}
                height={200}
                className="rounded-lg"
              />
              <button
                type="button"
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
            <BsCardImage size={24} />
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
          type="button"
          onClick={handlePost}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full py-2 px-4 font-semibold flex items-center gap-2"
        >
          <IoMdSend />
        </button>
      </div>
    </div>
  );
}
