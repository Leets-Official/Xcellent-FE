import { Span } from 'next/dist/trace';
import { useContext } from 'react';

export default function Tab() {
  const tabContext = useContext(TabContext);

  const { tab, setTab } = tabContext;

  const onClickPost = () => {
    setTab('post');
  };
  const onClickLike = () => {
    setTab('like');
  };
  return (
    <main>
      <div className="flex justify-around w-full bg-transparent">
        <div
          onClick={onClickPost}
          className={`px-4 py-2 ${tab === 'post' ? 'text-white font-bold' : ' text-gray-500'} relative `}
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
          } relative`}
        >
          Likes
          {tab === 'like' && (
            <span className="absolute bottom-0 left-0 w-full h-1 bg-sky-500 rounded-full"></span>
          )}
        </div>
      </div>
    </main>
  );
}
