'use client';
import React, { useState } from 'react';

interface PostComment {
  id: number;
  author: string;
  content: string;
}

interface CommentSectionProps {
  postId: number;
  comments: PostComment[];
  onCommentSubmit: (postId: number, commentContent: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  comments,
  onCommentSubmit,
}) => {
  const [newCommentContent, setNewCommentContent] = useState('');

  const handleCommentSubmit = () => {
    if (newCommentContent.trim()) {
      onCommentSubmit(postId, newCommentContent);
      setNewCommentContent(''); // 댓글 입력 필드 초기화
    }
  };

  return (
    <>
      {/* 댓글 목록 */}
      {comments.map(comment => (
        <div key={comment.id} className="mt-4 space-y-4">
          <p>
            {comment.author}: {comment.content}
          </p>
        </div>
      ))}

      {/* 새로운 댓글 입력 */}
      <textarea
        value={newCommentContent}
        onChange={e => setNewCommentContent(e.target.value)}
        placeholder="댓글을 입력하세요..."
        className="w-full p-2 bg-black text-white border border-gray-700 rounded-md mb-2"
      />
      <button
        onClick={handleCommentSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full py-1 px-4 text-sm"
      >
        댓글 작성
      </button>
    </>
  );
};

export default CommentSection;
