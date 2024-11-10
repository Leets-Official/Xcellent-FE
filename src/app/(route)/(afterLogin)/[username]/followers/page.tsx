'use client';

import Tab from '@/app/(route)/(afterLogin)/[username]/_component/Tab';
import TabProvider from '@/app/(route)/(afterLogin)/[username]/_component/TabProvider';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import FollowingButton from '../_component/FollowingButton';

export default function FollowersPage() {
  const router = useRouter();

  const followersList = [
    {
      userName: 'KimGachon',
      customId: '@gachonneee',
      profileImage: '/profile.svg',
    },
    {
      userName: 'Son',
      customId: '@asdfffff',
      profileImage: '/profile.svg',
    },
    {
      userName: 'Wow',
      customId: '@qoqoqoqo',
      profileImage: '/profile.svg',
    },
  ];

  const onClickToUserProfile = (userName: string) => {
    router.push(`/${userName}`);
  };
  return (
    <TabProvider>
      <Tab type="followersFollowing" userName="dahyeon" />
      <div className="p-4">
        <div className="text-white">
          {followersList.map(follower => (
            <div
              key={follower.customId}
              onClick={() => onClickToUserProfile(follower.userName)}
              className="flex items-center gap-x-4 mb-4 cursor-pointer"
            >
              <Image
                src={follower.profileImage}
                alt={follower.customId}
                width={10}
                height={10}
                className="bg-slate-300 w-10 h-10 rounded-full"
              />
              <div>
                <div className="text-white font-bold hover:underline cursor-pointer">
                  {follower.userName}
                </div>
                <div className="text-gray-500">{follower.customId}</div>
              </div>
              <FollowingButton />
            </div>
          ))}
        </div>
      </div>
    </TabProvider>
  );
}
