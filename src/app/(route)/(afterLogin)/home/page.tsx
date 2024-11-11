'use client';

import React, { useState, useEffect } from 'react';

interface Post {
  id: number;
  author: string;
  content: string;
  likes: number;
  retweets: number;
  comments: number;
  isLiked: boolean;
}
console.log('HomePage 렌더링 중');

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // 임시 데이터 로드
    setPosts([
      {
        id: 1,
        author: 'Elon Musk',
        content:
          "🎶 We been spending most our lives Livin' in an Amish paradise 🎶",
        likes: 7300,
        retweets: 50000,
        comments: 310000,
        isLiked: false,
      },
      // 더 많은 게시글 추가 가능
    ]);
  }, []);

  const handleLike = (id: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
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

  const handleRetweet = (id: number) => {
    // 리트윗 로직
    const postToRetweet = posts.find(post => post.id === id);
    if (postToRetweet) {
      setPosts(prevPosts => [
        ...prevPosts,
        { ...postToRetweet, id: prevPosts.length + 1, author: 'Myself' },
      ]);
    }
  };

  const sortedPosts = [...posts].sort((a, b) => b.likes - a.likes);

  return (
    <div className="flex min-h-screen bg-gray-100 text-black">
      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="bg-white p-4 rounded-lg shadow-md mb-4 max-w-xl mx-auto">
          <textarea
            placeholder="What's happening?"
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
          />
          <button
            type="button"
            className="bg-blue-500 text-white rounded-full py-2 px-6 font-semibold"
          >
            Post
          </button>
        </div>
        {sortedPosts.map(post => (
          <div
            key={post.id}
            className="bg-white shadow-md p-4 rounded-lg mb-4 max-w-xl mx-auto"
          >
            <p className="font-semibold">{post.author}</p>
            <p className="mt-2">{post.content}</p>
            <div className="flex items-center mt-4 space-x-4 text-gray-500">
              <button
                type="button"
                onClick={() => handleLike(post.id)}
                className={`flex items-center ${post.isLiked ? 'text-red-500' : 'text-gray-500'}`}
              >
                {post.isLiked ? '❤️' : '♡'}{' '}
                <span className="ml-1">{post.likes}</span>
              </button>
              <button
                type="button"
                onClick={() => handleRetweet(post.id)}
                className="text-blue-500 flex items-center"
              >
                🔁 <span className="ml-1">{post.retweets}</span>
              </button>
              <button type="button" className="flex items-center">
                💬 <span className="ml-1">{post.comments}</span>
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* Right Sidebar */}
      <aside className="w-1/4 p-4 hidden md:block">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </aside>
    </div>
  );
}
