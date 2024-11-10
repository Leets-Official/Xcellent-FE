import React from 'react';
import PostForm from '../_component/PostForm';
import PostItem from '../_component/PostItems';

// Post 인터페이스 정의
interface Post {
  id: number;
  author: string;
  authorImage: string;
  content: string;
  images: string[];
  likes: number;
  retweets: number;
  comments: Comment[]; // Comment[]로 통일
  isLiked: boolean;
}

// Comment 인터페이스 정의 (createdAt 필드 추가)
interface Comment {
  id: number;
  author: string;
  authorImage: string;
  content: string;
  createdAt: string; // createdAt 필드를 추가하여 PostComment와 동일하게 만듦
}

const HomePage: React.FC<{
  posts: Post[];
  onPostSubmit: (content: string, images: string[]) => void;
  onLike: (id: number) => void;
  onRetweet: (id: number) => void;
  onCommentSubmit: (postId: number, commentContent: string) => void;
}> = ({ posts, onPostSubmit, onLike, onRetweet, onCommentSubmit }) => {
  return (
    <main className="flex flex-col items-center min-h-screen bg-black text-white">
      {/* 게시글 작성 폼 */}
      <PostForm onPostSubmit={onPostSubmit} />

      {/* 게시물 목록 */}
      {posts.map(post => (
        <PostItem
          key={post.id}
          post={post}
          onLike={onLike}
          onRetweet={onRetweet}
          onCommentSubmit={onCommentSubmit}
        />
      ))}
    </main>
  );
};

export default HomePage;
