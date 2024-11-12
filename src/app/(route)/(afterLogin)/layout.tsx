'use client';

import { useState } from 'react';
import Sidebar from '@/app/(route)/(afterLogin)/_component/Sidebar';
import PostModal from '@/app/(route)/(afterLogin)/_component/PostModal';
import HomePage from '@/app/(route)/(afterLogin)/home/page';

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
  comments: Comment[];
  isLiked: boolean;
}

const Layout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  // 모달 열기
  const handlePostButtonClick = () => {
    setIsModalOpen(true);
  };

  // 게시글 작성 후 posts 배열 업데이트
  const handlePostSubmit = (content: string, images: string[]) => {
    const newPost = {
      id: Date.now(),
      author: 'Myself',
      authorImage: '/profile-placeholder.png',
      content,
      images,
      likes: 0,
      retweets: 0,
      comments: [],
      isLiked: false,
    };
    setPosts([newPost, ...posts]); // 새 게시물을 기존 게시물 목록 앞에 추가
    setIsModalOpen(false); // 모달 닫기
  };

  // 좋아요 토글 함수
  const handleLike = (id: number) => {
    setPosts(
      posts.map(post =>
        post.id === id
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    );
  };

  // 리트윗 함수
  const handleRetweet = (id: number) => {
    setPosts(
      posts.map(post =>
        post.id === id ? { ...post, retweets: post.retweets + 1 } : post,
      ),
    );
  };

  // 댓글 추가 함수
  const handleCommentSubmit = (postId: number, commentContent: string) => {
    const newComment = {
      id: Date.now(),
      content: commentContent,
      author: 'Myself',
      authorImage: '/profile-placeholder.png',
      createdAt: new Date().toISOString(),
    };
    setPosts(
      posts.map(post =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post,
      ),
    );
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* 좌측 사이드바 */}
      <Sidebar onPostButtonClick={handlePostButtonClick} />

      {/* 중앙 피드 */}
      <main className="flex-1 ml-64 border-r border-gray-700">
        {/* page.tsx에 posts 전달 및 이벤트 핸들러 전달 */}
        <HomePage
          posts={posts}
          onLike={handleLike} // 좋아요 기능 전달
          onRetweet={handleRetweet} // 리트윗 기능 전달
          onCommentSubmit={handleCommentSubmit} // 댓글 기능 전달
          onPostSubmit={handlePostSubmit} // 게시글 작성 기능 전달
        />

        {/* 게시글 작성 모달 */}
        <PostModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onPostSubmit={handlePostSubmit}
        />
      </main>
    </div>
  );
};

export default Layout;
