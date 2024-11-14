'use client';

import Tab from '@/app/(route)/(afterLogin)/[username]/_component/Tab';
import TabProvider from '@/app/(route)/(afterLogin)/[username]/_component/TabProvider';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getFollowingList } from '@/app/api/user/following';
import FollowingButton from '../_component/FollowingButton';

export default function FollowingPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [followingList, setFollowingList] = useState<any[]>([]);
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

        const data = await getFollowingList(customId, pageNo);
        const newFollowing = data.content || [];

        setFollowingList(prevList => [
          ...prevList,
          ...newFollowing.filter(
            newFollow =>
              !prevList.some(
                existingFollow =>
                  existingFollow.customId === newFollow.customId,
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
      setFollowingList(prevList =>
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
      setFollowingList(prevList =>
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
        {followingList.length === 0 ? (
          <div className="text-center text-white font-bold">
            No Following Found.
          </div>
        ) : (
          followingList.map(following => (
            <div
              key={following.customId}
              className="flex items-center gap-x-4 mb-4"
            >
              <Image
                src={following.profileImage || '/profile.svg'}
                alt={following.customId}
                width={40}
                height={40}
                className="bg-slate-300 w-10 h-10 rounded-full"
              />
              <div>
                <div className="text-white font-bold">{following.userName}</div>
                <div className="text-gray-500">{following.customId}</div>
              </div>
              <FollowingButton
                isFollowing={following.isFollowing}
                onFollow={() => handleFollow(following.customId)}
                onUnfollow={() => handleUnfollow(following.customId)}
              />
            </div>
          ))
        )}
      </div>
    </TabProvider>
  );
}
