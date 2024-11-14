'use client';

import Tab from '@/app/(route)/(afterLogin)/[username]/_component/Tab';
import TabProvider from '@/app/(route)/(afterLogin)/[username]/_component/TabProvider';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getFollowersList } from '@/app/api/user/follower';
import FollowingButton from '../_component/FollowingButton';
import { followUser, unfollowUser } from '@/app/api/user/follow';

export default function FollowersPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [followersList, setFollowersList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pageNo, setPageNo] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const pathSegments = pathname.split('/');
  const customId = pathSegments[1];

  useEffect(() => {
    const fetchData = async () => {
      if (loading || !hasMore) return;
      try {
        setLoading(true);

        const data = await getFollowersList(customId, pageNo);
        const newFollowers = data.content || [];

        setFollowersList(prevList => [
          ...prevList,
          ...newFollowers.filter(
            newFollower =>
              !prevList.some(
                existingFollower =>
                  existingFollower.customId === newFollower.customId,
              ),
          ),
        ]);

        if (data.last) {
          setHasMore(false);
        }
      } catch (err) {
        console.error('Failed to fetch data: ', err);
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageNo, customId]);

  const handleFollow = async (customId: string) => {
    try {
      await followUser(customId);
      setFollowersList(prevList =>
        prevList.map(user =>
          user.customId === customId ? { ...user, isFollowing: true } : user,
        ),
      );
    } catch (error) {
      console.error('팔로우 요청 실패:', error);
    }
  };

  const handleUnfollow = async (customId: string) => {
    try {
      await unfollowUser(customId);
      setFollowersList(prevList =>
        prevList.map(user =>
          user.customId === customId ? { ...user, isFollowing: false } : user,
        ),
      );
    } catch (error) {
      console.error('언팔로우 요청 실패:', error);
    }
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
              className="flex items-center gap-x-4 mb-4"
            >
              <Image
                src={follower.profileImage || '/profile.svg'}
                alt={follower.customId}
                width={40}
                height={40}
                className="bg-slate-300 w-10 h-10 rounded-full"
              />
              <div>
                <div className="text-white font-bold">{follower.userName}</div>
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
      </div>
    </TabProvider>
  );
}
