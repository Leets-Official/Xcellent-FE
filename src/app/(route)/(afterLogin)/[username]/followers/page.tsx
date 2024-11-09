'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import TabProvider from '@/app/(route)/(afterLogin)/[username]/_component/TabProvider';
import Tab from '@/app/(route)/(afterLogin)/[username]/_component/Tab';

export default function Followers() {
  return (
    <TabProvider>
      <main className="w-[600px] mx-auto">
        <h1 className="text-xl font-bold text-white mb-4">Followers</h1>
        <Tab type="followersFollowing" />
        <div className="mt-4">
          <div className="text-white">Followers</div>
        </div>
      </main>
    </TabProvider>
  );
}
