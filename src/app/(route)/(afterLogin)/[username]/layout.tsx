'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import BackButton from '@/app/(route)/(afterLogin)/_component/BackButton';
import { getProfileInfo } from '@/app/api/user/user';

type Props = {
  children: ReactNode;
};

export default function ProfileLayout({ children }: Props) {
  const segment = useSelectedLayoutSegment();
  const [userName, setUserName] = useState<string>('');
  const [customId, setCustomId] = useState<string>('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getProfileInfo();
        setUserName(userInfo.userName);
        setCustomId(userInfo.customId);
        // console.log('Fetched user info: ', userInfo);
      } catch (error) {
        console.error('Error fetching profile info: ', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="w-[600px] border-l border-r border-gray-200 flex flex-col items-stretch">
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
