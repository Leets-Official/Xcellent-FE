'use client';

import { useEffect, useState, useRef } from 'react';
import PostForm from '../_component/PostForm';
import PostItem from '../_component/PostItems';
import { getArticleList } from '@/app/api/article/article'; // 상대 경로 사용

// Post와 Comment 인터페이스 정의
interface Post {
  id: string;
  author: string;
  authorImage: string;
  content: string;
  images: string[];
  likes: number;
  retweets: number;
  comments: Comment[];
  isLiked: boolean;
  createdAt: string; // createdAt 필드 추가
}

interface Comment {
  id: number;
  author: string;
  authorImage: string;
  content: string;
  createdAt: string;
}

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]); // 게시글 목록 상태
  const [cursor, setCursor] = useState<string | null>(null); // 커서 상태
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const fetchArticleList = async (cursor: string | null = null) => {
    try {
      setLoading(true);
      const result = await getArticleList(cursor);
      setPosts(prevPosts => [...prevPosts, ...result]);
      setCursor(result.createdAt); // 다음 커서 업데이트
      setLoading(false);
    } catch (error) {
      console.error('Error: ', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticleList();
  }, []);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loading) {
        fetchArticleList(cursor);
      }
    });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [cursor, loading]);

  return (
    <div className="flex flex-col w-full min-h-screen h-screen items-center bg-black text-white">
      <div className="w-1/2">
        {/* 게시글 작성 폼 */}
        <PostForm />

        {/* 게시물 목록 */}
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map(post => (
            <PostItem
              key={post.id}
              post={post}
              onLike={() => {}}
              onRetweet={() => {}}
              onCommentSubmit={() => {}}
              fetchArticleList={fetchArticleList}
            />
          ))
        ) : (
          <p className="text-gray-500">No posts available</p>
        )}

        {/* 로딩 상태 표시 */}
        {loading && <p className="text-gray-500">Loading...</p>}

        {/* 더 불러오기 트리거 요소 */}
        <div ref={loadMoreRef} className="h-10"></div>
      </div>
    </div>
  );
}
