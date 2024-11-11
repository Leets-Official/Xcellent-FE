'use client';

import Tab from '@/app/(route)/(afterLogin)/[username]/_component/Tab';
import TabProvider from '@/app/(route)/(afterLogin)/[username]/_component/TabProvider';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import FollowingButton from '../_component/FollowingButton';

export default function FollowingPage() {
  const router = useRouter();

  // 팔로잉 목록
  const followingList = [
    {
      userName: 'KimGachon',
      customId: '@gachonneee',
      profileImage: '/profile.svg',
    },
    {
      userName: 'Wow',
      customId: '@qoqoqoqo',
      profileImage: '/profile.svg',
    },
  ];

  // 사용자 프로필 페이지로 이동하는 함수
  const onClickToUserProfile = (userName: string) => {
    router.push(`/${userName}`);
  };

  return (
    <TabProvider>
      <Tab type="followersFollowing" userName="dahyeon" />
      <div className="p-4">
        <div className="text-white">
          {followingList.map(following => (
            <div
              key={following.customId}
              onClick={() => onClickToUserProfile(following.userName)}
              className="flex items-center gap-x-4 mb-4 cursor-pointer"
            >
              <Image
                src={following.profileImage}
                alt={following.customId}
                width={10}
                height={10}
                className="bg-slate-300 w-10 h-10 rounded-full"
              />
              <div>
                <div className="text-white font-bold hover:underline cursor-pointer">
                  {following.userName}
                </div>
                <div className="text-gray-500">{following.customId}</div>
              </div>
              <FollowingButton />
            </div>
          ))}
        </div>
      </div>
    </TabProvider>
  );
}
