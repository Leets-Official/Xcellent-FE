'use client';

import Tab from '@/app/(route)/(afterLogin)/[username]/_component/Tab';
import TabProvider from '@/app/(route)/(afterLogin)/[username]/_component/TabProvider';

export default function FollowingPage() {
  return (
    <TabProvider>
      <Tab type="followersFollowing" userName="dahyeon" />
      <div className="p-4 text-white">팔로잉목록</div>
    </TabProvider>
  );
}
