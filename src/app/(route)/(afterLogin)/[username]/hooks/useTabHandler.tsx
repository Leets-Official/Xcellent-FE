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
  userName: string,
): TabHandlers {
  const { setTab } = useContext(TabContext);
  const router = useRouter();

  // customId 경로로 수정 , 좋아요는 customId/likes 경로로 이동하도록 수정해야함
  if (type === 'postsLikes') {
    return {
      post: () => {
        setTab('post');
        router.push(`/${userName}`);
      },
      like: () => {
        setTab('like');
        router.push(`/${userName}`);
      },
    };
  }

  // customId/followers , customId/following으로 이동하도록 수정해야함
  return {
    followers: () => {
      setTab('followers');
      router.push(`/${userName}/followers`);
    },
    following: () => {
      setTab('following');
      router.push(`/${userName}/following`);
    },
  };
}
