'use client';

import { useState } from 'react';

type FollowingButtonProps = {
  isFollowing: boolean;
  onFollow: () => void;
  onUnfollow: () => void;
};

export default function FollowingButton({
  isFollowing,
  onFollow,
  onUnfollow,
}: FollowingButtonProps) {
  const [hover, setHover] = useState(false);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // 이벤트 전파 막기

    if (isFollowing) {
      onUnfollow();
    } else {
      onFollow();
    }
  };

  return (
    <button
      type="button"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
      className={`text-sm font-bold p-1 rounded-full w-28 ml-auto
        ${
          isFollowing
            ? hover
              ? 'bg-red-800 text-red-700 border border-red-700 bg-opacity-35'
              : 'text-white border border-white'
            : 'border border-white text-white'
        }`}
    >
      {isFollowing ? (hover ? 'Unfollow' : 'Following') : 'Follow'}
    </button>
  );
}
