'use client';

import Image from 'next/image';
import Link from 'next/link';
import Tab from './_component/Tab';
import TabProvider from './_component/TabProvider';

export default function ProfilePage() {
  const user = {
    userName: 'dahyeon',
    customId: 'hihello',
    image: '/profile.svg',
    following: 10,
    followers: 30,
  };

  return (
    <TabProvider>
      <div className="p-4 pt-16">
        <div className="relative flex items-center gap-8">
          <Image
            src={user.image}
            alt={user.customId}
            width={150}
            height={150}
            className="rounded-full"
          />
          <Link href="/settings/profile">
            <button
              type="button"
              className="px-4 py-2 font-bold bg-transparent rounded-full text-white border border-white hover:bg-slate-800"
            >
              Edit Profile
            </button>
          </Link>
        </div>
        <div className="flex flex-col mt-4">
          <div className="text-white font-bold text-xl">{user.userName}</div>
          <div className="text-sm text-gray-500">@{user.customId}</div>
        </div>
        <div className="flex space-x-4 mt-2">
          <Link
            href={`/${user.userName}/following`}
            className="font-bold text-white"
          >
            {user.following}{' '}
            <span className="text-sm text-gray-500">Following</span>
          </Link>
          <Link
            href={`/${user.userName}/followers`}
            className="font-bold text-white"
          >
            {user.followers}{' '}
            <span className="text-sm text-gray-500">Followers</span>
          </Link>
        </div>

        {/* 탭 컴포넌트 */}
        <Tab type="postsLikes" />
      </div>
    </TabProvider>
  );
}
