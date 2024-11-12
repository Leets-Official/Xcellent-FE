'use client';

import React from 'react';
import PostForm from '../_component/PostForm';
import PostItem from '../_component/PostItems';

// Post와 Comment 인터페이스 정의
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

interface Comment {
  id: number;
  author: string;
  authorImage: string;
  content: string;
  createdAt: string;
}

const HomePage: React.FC<{
  posts: Post[];
  onPostSubmit: (content: string, images: string[]) => void;
  onLike: (id: number) => void;
  onRetweet: (id: number) => void;
  onCommentSubmit: (postId: number, commentContent: string) => void;
}> = ({ posts = [], onPostSubmit, onLike, onRetweet, onCommentSubmit }) => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white">
      {/* 게시글 작성 폼 */}
      <PostForm onPostSubmit={onPostSubmit} />

      {/* 게시물 목록 */}
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map(post => (
          <PostItem
            key={post.id}
            post={post}
            onLike={onLike}
            onRetweet={onRetweet}
            onCommentSubmit={onCommentSubmit}
          />
        ))
      ) : (
        <p className="text-gray-500">No posts available</p>
      )}
    </div>
  );
};

export default HomePage;
