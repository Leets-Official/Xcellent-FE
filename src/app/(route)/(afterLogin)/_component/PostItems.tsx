'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaRegComment, FaRetweet } from 'react-icons/fa';
import { FiBarChart2 } from 'react-icons/fi';
import { MdDeleteForever } from 'react-icons/md';
import { removeArticleAPI } from '@/app/api/article/article';

interface PostItemProps {
  post: any;
  onLike: (id: string) => void;
  onRetweet: (id: string) => void;
  onCommentSubmit: (postId: string, commentContent: string) => void;
  fetchArticleList: () => void; // fetchArticleList 함수 추가
}

export default function PostItems({
  post,
  onLike,
  onRetweet,
  onCommentSubmit,
  fetchArticleList,
}: PostItemProps) {
  const [isCommentVisible, setIsCommentVisible] = useState(false);

  const toggleCommentVisibility = () => {
    setIsCommentVisible(!isCommentVisible);
  };

  const handleDelete = async () => {
    try {
      await removeArticleAPI(post.articleId);
      alert('게시글이 삭제되었습니다.');
      fetchArticleList(); // 삭제 후 fetchArticleList 함수 호출
    } catch (error) {
      console.error('Error deleting article:', error);
    }
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
          {post.owner && (
            <MdDeleteForever
              size={24}
              onClick={handleDelete}
              className="cursor-pointer justify-self-end"
            />
          )}
          {/* 작성자 이름 및 아이디 */}
          <p className="font-semibold">{post.userName}</p>
          <p className="text-gray-400">@{post.customId}</p>
          {/* 게시글 내용 */}
          <p className="mt-2">{post.content}</p>

          {post.mediaUrls.length > 0 && (
            <div
              className={`grid gap-2 mt-2 ${post.mediaUrls.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}
            >
              {post.mediaUrls.map((image, index) => (
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
          )}
          {/* 좋아요, 리트윗, 댓글 아이콘 */}
          <div className="flex items-center mt-4 space-x-6 text-gray-500">
            {/* 댓글 아이콘 */}
            <button
              type="button"
              className="hover:text-blue-500 flex items-center space-x-1"
              onClick={toggleCommentVisibility}
            >
              <FaRegComment />
              {/* <span>{post.comments.length}</span> */}
            </button>

            {/* 리트윗 아이콘 */}
            <button
              type="button"
              onClick={() => onRetweet(post.id)}
              className="hover:text-green-500 flex items-center space-x-1"
            >
              <FaRetweet />
              {/* <span>{post.retweets}</span> */}
            </button>

            {/* 좋아요 아이콘 */}
            <button
              type="button"
              onClick={() => onLike(post.id)}
              className={`flex items-center space-x-1 ${post.isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
            >
              {post.isLiked ? '❤️' : '♡'}
              {/* <span>{post.likes}</span> */}
            </button>

            {/* 조회수 아이콘 */}
            <button
              type="button"
              className="hover:text-gray-400 flex items-center space-x-1"
            >
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
