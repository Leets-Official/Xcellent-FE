'use client';

import { useState } from 'react';

export default function FollowingButton() {
  const [hover, setHover] = useState(false);

  return (
    <button
      type="button"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={` text-sm  font-bold p-1 rounded-full w-28 ml-auto
        ${
          hover
            ? ' bg-red-800 text-red-700 border border-red-700 bg-opacity-35'
            : 'text-white border border-white'
        }`}
    >
      {hover ? 'Unfollow' : 'Following'}
    </button>
  );
}
