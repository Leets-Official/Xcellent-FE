import { useContext } from 'react';
import { TabContext } from './TabProvider';

type TabType = 'postsLikes' | 'followersFollowing';

type TabProps = {
  type: TabType;
};

export default function Tab({ type }: TabProps) {
  const { tab, setTab } = useContext(TabContext);

  const onClickPost = () => setTab('post');
  const onClickLike = () => setTab('like');
  const onClickFollowers = () => setTab('followers');
  const onClickFollowing = () => setTab('following');

  return (
    <main>
      <div className="flex justify-around w-full bg-transparent">
        {type === 'postsLikes' && (
          <>
            <div
              onClick={onClickPost}
              className={`px-4 py-2 ${
                tab === 'post' ? 'text-white font-bold' : 'text-gray-500'
              } relative hover:bg-gray-800 cursor-pointer`}
            >
              Posts
              {tab === 'post' && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-sky-500 rounded-full"></span>
              )}
            </div>
            <div
              onClick={onClickLike}
              className={`px-4 py-2 ${
                tab === 'like' ? 'text-white font-bold' : 'text-gray-500'
              } relative hover:bg-gray-800 cursor-pointer`}
            >
              Likes
              {tab === 'like' && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-sky-500 rounded-full"></span>
              )}
            </div>
          </>
        )}
        {type === 'followersFollowing' && (
          <>
            <div
              onClick={onClickFollowers}
              className={`px-4 py-2 ${
                tab === 'followers' ? 'text-white font-bold' : 'text-gray-500'
              } relative hover:bg-gray-800 cursor-pointer`}
            >
              Followers
              {tab === 'followers' && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-sky-500 rounded-full"></span>
              )}
            </div>
            <div
              onClick={onClickFollowing}
              className={`px-4 py-2 ${
                tab === 'following' ? 'text-white font-bold' : 'text-gray-500'
              } relative hover:bg-gray-800 cursor-pointer`}
            >
              Following
              {tab === 'following' && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-sky-500 rounded-full"></span>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
