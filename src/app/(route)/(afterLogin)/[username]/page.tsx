'use client';

import { useRouter, usePathname } from 'next/navigation';
import BackButton from '@/app/(route)/(afterLogin)/_component/BackButton';
import Tab from './_component/Tab';
import TabProvider from './_component/TabProvider';

export default function Profile() {
  const router = useRouter();
  const user = {
    userName: 'dahyeon',
    customId: 'hihello',
    image: '/profile.svg',
    following: 10,
    followers: 30,
  };

  const pathname = usePathname();

  const onClickToEditProfileModal = () => {
    router.push(`${pathname}/settings/profile`);
  };

  const onClickToFollowing = () => {
    router.push(`/${user.userName}/following`);
  };
  const onClickToFollowers = () => {
    router.push(`/${user.userName}/followers`);
  };

  return (
    <TabProvider>
      <main className="w-[600px] border-l border-r border-gray-200 flex flex-col items-stretch">
        <div className="flex items-center h-14 px-4">
          <BackButton />
          <h3 className="text-xl font-bold text-white ml-8">{user.userName}</h3>
        </div>
        <div className="relative bg-gray-800 h-40">
          <img
            src={user.image}
            alt={user.customId}
            className="bg-slate-300 absolute w-[150px] h-[150px] rounded-full top-[95%] -translate-y-1/2 left-4"
          />
          <button
            type="button"
            onClick={onClickToEditProfileModal}
            className="absolute right-4 top-4 px-4 py-1 bg-black text-white border border-gray-600 rounded-full hover:bg-gray-700"
          >
            Edit profile
          </button>
        </div>
        <div className="p-4 pt-16">
          <div className="flex flex-col mt-4">
            <div className="text-white font-bold text-xl">{user.userName}</div>
            <div className="text-sm text-gray-500">@{user.customId}</div>
          </div>
          <div className="flex space-x-4 mt-2 text-sm text-gray-500">
            <div className="hover:underline cursor-pointer">
              <span
                onClick={onClickToFollowing}
                className="font-bold text-white "
              >
                {user.following}
              </span>{' '}
              Following
            </div>
            <div className="hover:underline cursor-pointer">
              <span
                onClick={onClickToFollowers}
                className="font-bold text-white "
              >
                {user.followers}
              </span>{' '}
              Followers
            </div>
          </div>
        </div>
        <Tab type="postsLikes" />
      </main>
    </TabProvider>
  );
}
