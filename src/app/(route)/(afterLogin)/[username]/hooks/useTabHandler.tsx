'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { TabContext } from '../_component/TabProvider';

type TabType = 'postsLikes' | 'followersFollowing';

interface PostsLikesHandlers {
  post: () => void;
  like: () => void;
}

interface FollowersFollowingHandlers {
  followers: () => void;
  following: () => void;
}

type TabHandlers = PostsLikesHandlers | FollowersFollowingHandlers;

export default function useTabHandler(
  type: TabType,
  customId: string,
): TabHandlers {
  const { setTab } = useContext(TabContext);
  const router = useRouter();

  if (type === 'postsLikes') {
    return {
      post: () => {
        setTab('post');
        router.push(`/${customId}`);
      },
      like: () => {
        setTab('like');
        router.push(`/${customId}/likes`);
      },
    };
  }

  return {
    followers: () => {
      setTab('followers');
      router.push(`/${customId}/followers`);
    },
    following: () => {
      setTab('following');
      router.push(`/${customId}/following`);
    },
  };
}
