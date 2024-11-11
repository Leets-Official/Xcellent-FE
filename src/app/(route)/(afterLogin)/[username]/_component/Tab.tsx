'use client';

import { useContext } from 'react';
import { TabContext } from './TabProvider';
import useTabHandler from '../hooks/useTabHandler';

type TabType = 'postsLikes' | 'followersFollowing';

type TabProps = {
  type: TabType;
  userName: string;
};

export default function Tab({ type, userName }: TabProps) {
  const { tab } = useContext(TabContext);
  const tabHandler = useTabHandler(type, userName);

  const isPostsLikesHandler = (
    handler: any,
  ): handler is { post: () => void; like: () => void } =>
    'post' in handler && 'like' in handler;

  const tabs = isPostsLikesHandler(tabHandler)
    ? [
        { label: 'Posts', key: 'post', onClick: tabHandler.post },
        { label: 'Likes', key: 'like', onClick: tabHandler.like },
      ]
    : [
        { label: 'Followers', key: 'followers', onClick: tabHandler.followers },
        { label: 'Following', key: 'following', onClick: tabHandler.following },
      ];

  return (
    <main>
      <div className="flex justify-around w-full bg-transparent">
        {tabs.map(({ label, key, onClick }) => (
          <div key={key} className="text-center hover:bg-gray-900 w-1/2">
            <button
              type="button"
              onClick={onClick}
              className={`px-4 py-2 ${
                tab === key ? 'text-white font-bold' : 'text-gray-500'
              } relative`}
            >
              {label}
              {tab === key && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-sky-500 rounded-full" />
              )}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
