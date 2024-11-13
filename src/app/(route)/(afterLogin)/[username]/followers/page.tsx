'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import TabProvider from '@/app/(route)/(afterLogin)/[username]/_component/TabProvider';
import Tab from '@/app/(route)/(afterLogin)/[username]/_component/Tab';
import FollowingButton from '../_component/FollowingButton';
import { getFollowersList } from '@/app/api/user/follower';
import { followUser, unfollowUser } from '@/app/api/user/follow';

export default function FollowersPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [followersList, setFollowersList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [pageNo, setPageNo] = useState<number>(1);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const customId = pathname.split('/')[1];

  useEffect(() => {
    const fetchData = async () => {
      if (loading || !hasMore) return;
      try {
        setLoading(true);
        const data = await getFollowersList(customId, pageNo);
        const newFollowers = data.content || [];
        setFollowersList(prev => [...prev, ...newFollowers]);
        if (pageNo >= data.totalPages) {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Failed to fetch followers list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageNo, customId]);

  const handleFollow = async (customId: string) => {
    await followUser(customId);
    setFollowersList(prev =>
      prev.map(user =>
        user.customId === customId ? { ...user, isFollowing: true } : user,
      ),
    );
  };

  const handleUnfollow = async (customId: string) => {
    await unfollowUser(customId);
    setFollowersList(prev =>
      prev.map(user =>
        user.customId === customId ? { ...user, isFollowing: false } : user,
      ),
    );
  };

  const onClickToUserProfile = (followerCustomId: string) => {
    router.push(`/${followerCustomId}`);
  };

  return (
    <TabProvider>
      <Tab type="followersFollowing" customId={customId} />
      <div className="p-4">
        {followersList.length === 0 ? (
          <div className="text-center text-white font-bold">
            No Followers Found.
          </div>
        ) : (
          followersList.map(follower => (
            <div
              key={follower.customId}
              className="flex items-center gap-x-4 mb-4 cursor-pointer"
              onClick={() => onClickToUserProfile(follower.customId)}
            >
              <Image
                src={follower.profileImage || '/profile.svg'}
                alt={follower.customId}
                width={40}
                height={40}
                className="bg-slate-300 w-10 h-10 rounded-full"
              />
              <div>
                <div className="text-white font-bold hover:underline">
                  {follower.userName}
                </div>
                <div className="text-gray-500">{follower.customId}</div>
              </div>
              <FollowingButton
                isFollowing={follower.isFollowing}
                onFollow={() => handleFollow(follower.customId)}
                onUnfollow={() => handleUnfollow(follower.customId)}
              />
            </div>
          ))
        )}
        <div ref={observerRef} className="h-10" />
        {loading && (
          <div className="text-center text-white font-bold">
            Loading more...
          </div>
        )}
      </div>
    </TabProvider>
  );
}
