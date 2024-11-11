'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import { ReactNode } from 'react';
import BackButton from '@/app/(route)/(afterLogin)/_component/BackButton';

type Props = {
  children: ReactNode;
};

export default function ProfileLayout({ children }: Props) {
  const segment = useSelectedLayoutSegment();
  const user = {
    userName: 'dahyeon',
    customId: 'hihello',
  };

  return (
    <div className="w-[600px] border-l border-r border-gray-200 flex flex-col items-stretch">
      <div className="flex items-center h-14 px-4">
        <BackButton />
        <div className="flex flex-col items-center">
          <div className="text-xl font-bold text-white ml-8">
            {user.userName}
          </div>
          {(segment === 'followers' || segment === 'following') && (
            <div className="text-sm text-gray-500 px-4">@{user.customId}</div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
