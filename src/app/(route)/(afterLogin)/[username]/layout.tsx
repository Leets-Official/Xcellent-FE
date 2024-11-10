'use client';

import { ReactNode } from 'react';
import BackButton from '@/app/(route)/(afterLogin)/_component/BackButton';

type Props = {
  children: ReactNode;
};

export default function ProfileLayout({ children }: Props) {
  const user = {
    userName: 'dahyeon',
    customId: 'hihello',
  };

  return (
    <div className="w-[600px] border-l border-r border-gray-200 flex flex-col items-stretch">
      <div className="flex items-center h-14 px-4">
        <BackButton />
        <h3 className="text-xl font-bold text-white ml-8">{user.userName}</h3>
      </div>

      {children}
    </div>
  );
}
