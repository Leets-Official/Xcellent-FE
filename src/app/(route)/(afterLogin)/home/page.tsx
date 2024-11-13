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
  const [hasMore, setHasMore] = useState<boolean>(true); // 더 불러올 게시글이 있는지 여부
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useRef(true);

  const fetchArticleList = async (cursor: string | null = null) => {
    try {
      setLoading(true);
      const result = await getArticleList(cursor);
      if (result.length === 0) {
        setHasMore(false); // 더 불러올 게시글이 없음을 설정
      } else {
        setPosts(prevPosts => [...prevPosts, ...result]);
        setCursor(result[result.length - 1].createdAt); // 다음 커서 업데이트
      }
      setLoading(false);
    } catch (error) {
      console.error('Error: ', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      fetchArticleList();
      isFirstRender.current = false; // 첫 렌더링 이후에는 호출하지 않도록 설정
    }
  }, []); // 빈 배열로 첫 렌더링에서만 실행되도록 설정

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loading && hasMore) {
        fetchArticleList(cursor);
      }
    });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [cursor, loading, hasMore]);

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
