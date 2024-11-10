'use client';

import Tab from '@/app/(route)/(afterLogin)/[username]/_component/Tab';
import TabProvider from '@/app/(route)/(afterLogin)/[username]/_component/TabProvider';

export default function FollowersPage() {
  return (
    <TabProvider>
      <Tab type="followersFollowing" userName="dahyeon" />
      <div className="p-4">
        <div className="text-white">팔로워 목록 </div>
      </div>
    </TabProvider>
  );
}
