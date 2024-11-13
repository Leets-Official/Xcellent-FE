'use client';

import { useSelectedLayoutSegment, usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import BackButton from '@/app/(route)/(afterLogin)/_component/BackButton';
import { getProfileInfo, getOtherUserInfo } from '@/app/api/user/user';

type Props = {
  children: ReactNode;
};

export default function ProfileLayout({ children }: Props) {
  const segment = useSelectedLayoutSegment();
  const pathname = usePathname();
  const [userName, setUserName] = useState<string>('');
  const [customId, setCustomId] = useState<string>('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const pathSegments = pathname.split('/');
        const customIdFromUrl = pathSegments[1];

        // 로그인한 사용자의 customId 가져오기
        const myProfileData = await getProfileInfo();
        const myCustomId = myProfileData.customId;

        if (customIdFromUrl === myCustomId) {
          // 내 프로필
          setUserName(myProfileData.userName);
          setCustomId(myProfileData.customId);
        } else {
          // 다른 유저의 프로필
          const otherUserData = await getOtherUserInfo(customIdFromUrl);
          setUserName(otherUserData.userName);
          setCustomId(otherUserData.customId);
        }
      } catch (error) {
        console.error('프로필 정보 조회에 오류가 발생했습니다:', error);
      }
    };

    fetchUserInfo();
  }, [pathname]);

  return (
    <div className="flex flex-col items-stretch w-full max-w-[600px] mx-auto">
      <div className="flex items-center h-14 px-4">
        <BackButton />
        <div className="flex flex-col items-center">
          <div className="text-xl font-bold text-white ml-8">{userName}</div>
          {(segment === 'followers' || segment === 'following') && (
            <div className="text-sm text-gray-500 px-4">@{customId}</div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
