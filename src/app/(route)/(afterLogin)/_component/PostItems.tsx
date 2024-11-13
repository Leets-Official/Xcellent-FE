'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaRegComment, FaRetweet } from 'react-icons/fa';
import { FiBarChart2 } from 'react-icons/fi';
import { MdDeleteForever } from 'react-icons/md';
import { removeArticleAPI } from '@/app/api/article/article';
import { createCommentAPI } from '@/app/api/comment/comment';

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
  fetchArticleList,
}: PostItemProps) {
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const [commentContent, setCommentContent] = useState('');

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
  };

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

  const submitComment = async (articleId: string) => {
    if (!commentContent.trim()) {
      alert('댓글을 입력해주세요.');
      return;
    }
    try {
      await createCommentAPI(articleId, commentContent);
      setCommentContent(''); // 입력창 초기화
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <div className="bg-black border-b border-gray-800 p-4 w-full mx-auto text-white">
      <div className="flex items-start space-x-3">
        {/* 프로필 이미지 */}
        <div className="w-12 h-12 bg-gray-600 rounded-full">
          <Image
            src={'/profile.svg'}
            alt="profile.svg"
            color="white"
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>
        <div className="flex-auto">
          <div className="flex justify-between">
            <div className="font-semibold">{post.userName}</div>
            {post.owner && (
              <MdDeleteForever
                size={24}
                onClick={handleDelete}
                className="cursor-pointer"
              />
            )}
          </div>
          <p className="text-gray-400">@{post.customId}</p>
          {/* 게시글 내용 */}
          <p className="mt-2">{post.content}</p>

          {post.mediaUrls.length > 0 && (
            <div
              className={`grid gap-2 mt-2 ${post.mediaUrls.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}
            >
              {post.mediaUrls.map((image: string, index: any) => (
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
            <div className="mt-4 flex-auto">
              <div>
                {post.comments.map((comment: any, index: any) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-600 rounded-full">
                      <Image
                        src={'/profile.svg'}
                        alt="profile.svg"
                        color="white"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <div className="font-semibold">{comment.userName}</div>
                      <p>{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex">
                <textarea
                  placeholder="댓글을 입력하세요."
                  className="w-full p-2 bg-black text-white border border-gray-700 rounded-md resize-none"
                  rows={2}
                  value={commentContent}
                  onChange={handleCommentChange}
                />
                <div className="items-center justify-center flex flex-shrink-0 p-3">
                  <button
                    onClick={() => submitComment(post.articleId)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    댓글 작성
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
