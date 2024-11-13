'use client';

import React, { useState, useEffect } from 'react';
import PostForm from '../_component/PostForm';
import PostItem from '../_component/PostItems';
import { getArticleList } from '@/app/api/article/article'; // 상대 경로 사용
// import createPost from '@/app/client/createPost'; // 절대 경로 사용

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

  useEffect(() => {
    const fetchArticleList = async () => {
      try {
        setPosts(await getArticleList());
        // console.log('Fetched user info: ', userInfo);
      } catch (error) {
        console.error('Error: ', error);
      }
    };

    fetchArticleList();
  }, []);

  // 게시글 작성 후 호출되는 함수

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
            />
          ))
        ) : (
          <p className="text-gray-500">No posts available</p>
        )}
      </div>
    </div>
  );
}
