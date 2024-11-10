'use client';

import { useState } from 'react';

export default function FollowingButton() {
  const [hover, setHover] = useState(false);

  return (
    <button
      type="button"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`text-white text-sm  font-bold p-1 rounded-full border border-white w-28 ml-auto
        ${
          hover
            ? 'bg-red-950 text-red-700 border border-red-700'
            : 'text-whte border border-white'
        }`}
    >
      {hover ? 'Unfollow' : 'Following'}
    </button>
  );
}
