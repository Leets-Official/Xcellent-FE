'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaRegComment, FaRetweet, FaHeart } from 'react-icons/fa';
import { FiBarChart2 } from 'react-icons/fi';
// Post와 Comment 인터페이스 정의
interface Post {
  id: string; // articleId는 string 타입
  writorId: string;
  authorImage: string;
  content: string;
  images: string[];
  likes: number;
  retweets: number;
  comments: Comment[];
  isLiked: boolean;
}

interface Comment {
  id: number;
  author: string;
  authorImage: string;
  content: string;
  createdAt: string;
}

// PostItemProps 인터페이스 정의
interface PostItemProps {
  post: Post;
  onLike: (id: string) => void; // id 타입을 string으로 변경
  onRetweet: (id: string) => void; // id 타입을 string으로 변경
  onCommentSubmit: (postId: string, commentContent: string) => void; // 추가
}

export default function PostItems({
  post,
  onLike,
  onRetweet,
  onCommentSubmit,
}: PostItemProps) {
  const [isCommentVisible, setIsCommentVisible] = useState(false);

  const toggleCommentVisibility = () => {
    setIsCommentVisible(!isCommentVisible);
  };

  return (
    <div className="bg-black border-b border-gray-800 p-4 w-full mx-auto text-white">
      <div className="flex items-start space-x-3">
        {/* 프로필 이미지 */}
        <Image
          src={post.authorImage}
          alt={post.author}
          width={48}
          height={48}
          className="rounded-full"
        />
        <div className="flex-grow">
          {/* 작성자 이름 및 아이디 */}
          <p className="font-semibold">{post.writerId}</p>
          <p className="text-gray-400">@{post.writerId}</p>

          {/* 게시글 내용 */}
          <p className="mt-2">{post.content}</p>

          {/* 이미지가 있을 경우 출력 */}
          {/* {post.images.length > 0 && (
            <div
              className={`grid gap-2 mt-2 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}
            >
              {post.images.map((image, index) => (
                <Image
                  key={index}
                  src={image} // 이미지 경로가 올바른지 확인 필요
                  alt={`Post image ${index + 1}`}
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              ))}
            </div>
          )} */}

          {/* 좋아요, 리트윗, 댓글 아이콘 */}
          <div className="flex items-center mt-4 space-x-6 text-gray-500">
            {/* 댓글 아이콘 */}
            <button
              className="hover:text-blue-500 flex items-center space-x-1"
              onClick={toggleCommentVisibility}
            >
              <FaRegComment />
              <span>{post.comments}</span>
            </button>

            {/* 리트윗 아이콘 */}
            <button
              onClick={() => onRetweet(post.id)}
              className="hover:text-green-500 flex items-center space-x-1"
            >
              <FaRetweet />
              {/* <span>{post.retweets}</span> */}
            </button>

            {/* 좋아요 아이콘 */}
            <button
              onClick={() => onLike(post.id)}
              className={`flex items-center space-x-1 ${post.isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
            >
              {post.isLiked ? '❤️' : '♡'}
              {/* <span>{post.likes}</span> */}
            </button>

            {/* 조회수 아이콘 */}
            <button className="hover:text-gray-400 flex items-center space-x-1">
              <FiBarChart2 />
            </button>
          </div>

          {/* 댓글 섹션 - 클릭 시에만 표시됨 */}
          {isCommentVisible && (
            <div className="mt-4">
              {/* 댓글 입력창 구현 가능 */}
              {/* 예시로 간단히 구현 */}
              <textarea
                placeholder="Write a comment..."
                className="w-full p-2 bg-black text-white border border-gray-700 rounded-md resize-none"
                rows={2}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const commentContent = (
                      e.target as HTMLTextAreaElement
                    ).value.trim();
                    if (commentContent) {
                      onCommentSubmit(post.id, commentContent);
                      (e.target as HTMLTextAreaElement).value = ''; // 입력창 초기화
                    }
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
