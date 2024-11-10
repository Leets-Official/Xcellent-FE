'use client';
import React from 'react';
import Image from 'next/image';
import CommentSection from './CommentSection';

// Post 인터페이스 정의
interface Post {
  id: number;
  author: string;
  authorImage: string;
  content: string;
  images: string[];
  likes: number;
  retweets: number;
  comments: PostComment[]; // CustomComment를 PostComment로 변경
  isLiked: boolean;
}

// 댓글 인터페이스 (CustomComment 대신 PostComment로 변경)
interface PostComment {
  id: number;
  content: string;
  author: string;
  authorImage: string;
  createdAt: string;
}

interface PostItemProps {
  post: Post;
  onLike: (id: number) => void;
  onRetweet: (id: number) => void;
  onCommentSubmit: (postId: number, commentContent: string) => void;
}

const PostItem: React.FC<PostItemProps> = ({
  post,
  onLike,
  onRetweet,
  onCommentSubmit,
}) => {
  return (
    <div className="bg-black border border-gray-700 p-4 rounded-lg mb-4 max-w-xl mx-auto">
      <div className="flex items-start space-x-3">
        <Image
          src={post.authorImage}
          alt={post.author}
          width={48}
          height={48}
          className="rounded-full"
        />
        <div className="flex-1">
          <p className="font-semibold text-white">{post.author}</p>
          <p className="mt-2 text-white">{post.content}</p>

          {post.images.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              {post.images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Post image ${index + 1}`}
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              ))}
            </div>
          )}

          {/* 좋아요 및 리트윗 버튼 */}
          <div className="flex items-center mt-4 space-x-4 text-gray-500">
            <button
              onClick={() => onLike(post.id)}
              className={`flex items-center ${post.isLiked ? 'text-red-500' : 'text-gray-500'}`}
            >
              {post.isLiked ? '❤️' : '♡'} <span>{post.likes}</span>
            </button>
            <button
              onClick={() => onRetweet(post.id)}
              className="text-gray-500 hover:text-blue-500 flex items-center"
            >
              {' '}
              🔁 <span>{post.retweets}</span>
            </button>
          </div>

          {/* 댓글 섹션 */}
          <CommentSection
            postId={post.id}
            comments={post.comments}
            onCommentSubmit={onCommentSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default PostItem;
