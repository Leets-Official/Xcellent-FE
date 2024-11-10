'use client';

import { ReactNode, useState } from 'react';
import Sidebar from '@/app/(route)/(afterLogin)/_component/Sidebar';
import PostModal from '@/app/(route)/(afterLogin)/_component/PostModal'; // 모달 컴포넌트 임포트
import Link from 'next/link';
import HomePage from '@/app/(route)/(afterLogin)/home/page'; // page.tsx 임포트

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

interface HomeLayoutProps {
  children: ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  // 사용자 ID 설정
  const me = { id: 'dahyeon' };

  // 모달 상태 및 게시물 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const handlePostButtonClick = () => {
    setIsModalOpen(true); // 모달 열기
  };

  // 새로운 게시물 추가 함수 (PostModal과 page.tsx 모두 이 함수를 사용)
  const handlePostSubmit = (post: Post) => {
    const newPost = {
      id: posts.length + 1,
      author: 'Myself',
      authorImage: '/profile-placeholder.png',
      content: post.content,
      images: post.images,
      likes: 0,
      retweets: 0,
      comments: [],
      isLiked: false,
    };
    setPosts([newPost, ...posts]); // 새 게시물을 기존 게시물 목록 앞에 추가
    setIsModalOpen(false);
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
      <Sidebar onPostButtonClick={handlePostButtonClick} />
      <main className="flex-1 ml-64">
        {/* 프로필 링크 */}
        <Link href={`/${me.id}`} legacyBehavior>
          <a className="text-blue-500 hover:underline">프로필</a>
        </Link>

        {/* page.tsx에 posts 전달 및 이벤트 핸들러 전달 */}
        <HomePage
          posts={posts}
          onLike={handleLike}
          onRetweet={handleRetweet}
          onCommentSubmit={handleCommentSubmit}
<<<<<<< HEAD
          onPostSubmit={(postContent, images) =>
            handlePostSubmit({
              id: posts.length + 1, // 새로운 ID 생성
              author: 'Myself', // 작성자 정보 추가
              authorImage: '/profile-placeholder.png', // 작성자 이미지 추가
              content: postContent,
              images: images,
              likes: 0, // 기본 좋아요 수
              retweets: 0, // 기본 리트윗 수
              comments: [], // 기본 댓글 목록
              isLiked: false, // 기본 좋아요 상태
            })
          }
=======
          onPostSubmit={handlePostSubmit}
>>>>>>> b28d4e6c30768862db5c44cc46e25065912361ba
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

export default HomeLayout;
