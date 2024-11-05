"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

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

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState<string>("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [showComments, setShowComments] = useState<number | null>(null);
  const [newComment, setNewComment] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      handleResize();
    }
  }, [newPost]);

  const handleResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && selectedImages.length + files.length <= 4) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setSelectedImages(prev => [...prev, ...newImages]);
    } else {
      alert("이미지는 최대 4개까지만 업로드할 수 있습니다.");
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handlePost = () => {
    if (newPost.trim() || selectedImages.length > 0) {
      const post: Post = {
        id: posts.length + 1,
        author: "Myself",
        authorImage: "/profile-placeholder.png",
        content: newPost,
        images: selectedImages,
        likes: 0,
        retweets: 0,
        comments: [],
        isLiked: false,
      };
      setPosts((prevPosts) => [...prevPosts, post]);
      setNewPost("");
      setSelectedImages([]);
    }
  };

  const handleLike = (id: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, isLiked: !post.isLiked, likes: post.likes + (post.isLiked ? -1 : 1) } : post
      )
    );
  };

  const handleRetweet = (id: number) => {
    setPosts((prevPosts) => {
      const postToRetweet = prevPosts.find((post) => post.id === id);
      if (postToRetweet) {
        const updatedPosts = prevPosts.map((post) =>
          post.id === id ? { ...post, retweets: post.retweets + 1 } : post
        );
        return [
          ...updatedPosts,
          { ...postToRetweet, id: prevPosts.length + 1, author: "Myself" },
        ];
      }
      return prevPosts;
    });
  };

  const handleComment = (postId: number) => {
    if (newComment.trim()) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: [
                  ...post.comments,
                  {
                    id: post.comments.length + 1,
                    author: "Myself",
                    authorImage: "/profile-placeholder.png",
                    content: newComment,
                    createdAt: new Date().toISOString(),
                  },
                ],
              }
            : post
        )
      );
      setNewComment("");
    }
  };

  const sortedPosts = [...posts].sort((a, b) => b.likes - a.likes);

  return (
    <div className="flex min-h-screen bg-black text-white">
      <main className="flex-1 p-4">
        <div className="bg-black p-4 border border-gray-700 rounded-lg mb-4 max-w-xl mx-auto">
          <div className="flex items-start space-x-3">
            <Image
              src="/profile-placeholder.png"
              alt="Profile"
              width={48}
              height={48}
              className="rounded-full"
            />
            <div className="flex-1">
              <textarea
                ref={textareaRef}
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                onInput={handleResize}
                placeholder="무슨 일이 일어나고 있나요?"
                className="w-full p-2 bg-black text-white border border-gray-700 rounded-md mb-2 min-h-[100px] resize-none"
              />
              {selectedImages.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-2">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={image}
                        alt={`Preview ${index + 1}`}
                        width={200}
                        height={200}
                        className="rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-black rounded-full p-1"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-between items-center">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer text-blue-500 hover:text-blue-600"
                >
                  🖼️ 이미지 추가
                </label>
                <button 
                  onClick={handlePost}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-full py-2 px-6 font-semibold"
                >
                  게시하기
                </button>
              </div>
            </div>
          </div>
        </div>
        {sortedPosts.map((post) => (
          <div key={post.id} className="bg-black border border-gray-700 p-4 rounded-lg mb-4 max-w-xl mx-auto">
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
                <div className="flex items-center mt-4 space-x-4 text-gray-500">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center hover:text-red-500 ${post.isLiked ? "text-red-500" : "text-gray-500"}`}
                  >
                    {post.isLiked ? "❤️" : "♡"} <span className="ml-1">{post.likes}</span>
                  </button>
                  <button
                    onClick={() => handleRetweet(post.id)}
                    className="text-gray-500 hover:text-blue-500 flex items-center"
                  >
                    🔁 <span className="ml-1">{post.retweets}</span>
                  </button>
                  <button 
                    onClick={() => setShowComments(showComments === post.id ? null : post.id)}
                    className="text-gray-500 hover:text-blue-500 flex items-center"
                  >
                    💬 <span className="ml-1">{post.comments.length}</span>
                  </button>
                </div>
                {showComments === post.id && (
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start space-x-2">
                      <Image
                        src="/profile-placeholder.png"
                        alt="My Profile"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="댓글을 입력하세요..."
                          className="w-full p-2 bg-black text-white border border-gray-700 rounded-md mb-2"
                        />
                        <button
                          onClick={() => handleComment(post.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full py-1 px-4 text-sm"
                        >
                          댓글 작성
                        </button>
                      </div>
                    </div>
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex items-start space-x-2">
                        <Image
                          src={comment.authorImage}
                          alt={comment.author}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <div className="flex-1">
                          <p className="font-semibold">{comment.author}</p>
                          <p className="text-gray-300">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </main>

      <aside className="w-1/4 p-4 hidden md:block">
        <div className="bg-black border border-gray-700 p-4 rounded-lg">
          <input
            type="text"
            placeholder="검색하기"
            className="w-full p-2 bg-black text-white border border-gray-700 rounded-md"
          />
        </div>
      </aside>
    </div>
  );
};

export default Home;
