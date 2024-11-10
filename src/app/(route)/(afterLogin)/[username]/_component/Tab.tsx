import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { TabContext } from './TabProvider';

type TabType = 'postsLikes' | 'followersFollowing';

type TabProps = {
  type: TabType;
  userName: string;
};

export default function Tab({ type, userName }: TabProps) {
  const { tab, setTab } = useContext(TabContext);
  const router = useRouter();

  const onClickPost = () => {
    setTab('post');
    router.push(`/${userName}`);
  };

  const onClickLike = () => {
    setTab('like');
    router.push(`/${userName}`);
  };

  const onClickFollowers = () => {
    setTab('followers');
    router.push(`/${userName}/followers`);
  };

  const onClickFollowing = () => {
    setTab('following');
    router.push(`/${userName}/following`);
  };

  return (
    <main>
      <div className="flex justify-around w-full bg-transparent">
        {type === 'postsLikes' && (
          <>
            <div className="text-center hover:bg-slate-800 w-1/2">
              <button
                type="button"
                onClick={onClickPost}
                className={`px-4 py-2 ${
                  tab === 'post' ? 'text-white font-bold' : 'text-gray-500'
                } relative hover:bg-gray-800`}
              >
                Posts
                {tab === 'post' && (
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-sky-500 rounded-full" />
                )}
              </button>
            </div>
            <div className="text-center hover:bg-slate-800 w-1/2">
              <button
                type="button"
                onClick={onClickLike}
                className={`px-4 py-2 ${
                  tab === 'like' ? 'text-white font-bold' : 'text-gray-500'
                } relative hover:bg-gray-800`}
              >
                Likes
                {tab === 'like' && (
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-sky-500 rounded-full" />
                )}
              </button>
            </div>
          </>
        )}
        {type === 'followersFollowing' && (
          <>
            <button
              type="button"
              onClick={onClickFollowers}
              className={`px-4 py-2 ${
                tab === 'followers' ? 'text-white font-bold' : 'text-gray-500'
              } relative hover:bg-gray-800`}
            >
              Followers
              {tab === 'followers' && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-sky-500 rounded-full" />
              )}
            </button>
            <button
              type="button"
              onClick={onClickFollowing}
              className={`px-4 py-2 ${
                tab === 'following' ? 'text-white font-bold' : 'text-gray-500'
              } relative hover:bg-gray-800`}
            >
              Following
              {tab === 'following' && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-sky-500 rounded-full" />
              )}
            </button>
          </>
        )}
      </div>
    </main>
  );
}
