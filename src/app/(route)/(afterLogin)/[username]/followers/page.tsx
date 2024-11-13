'use client';

import Tab from '@/app/(route)/(afterLogin)/[username]/_component/Tab';
import TabProvider from '@/app/(route)/(afterLogin)/[username]/_component/TabProvider';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getFollowersList } from '@/app/api/user/follower';

export default function FollowersPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [followersList, setFollowersList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pageNo, setPageNo] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
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

        // 중복된 customId를 가진 데이터 제거
        const uniqueFollowers = [
          ...followersList,
          ...newFollowers.filter(
            newFollower =>
              !followersList.some(
                existingFollower =>
                  existingFollower.customId === newFollower.customId,
              ),
          ),
        ];

        setFollowersList(uniqueFollowers);
        setTotalPages(data.totalPages || 0);

        if (pageNo >= data.totalPages) {
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

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setPageNo(prevPage => prevPage + 1);
        }
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore, loading]);

  const onClickToUserProfile = (followerCustomId: string) => {
    router.push(`/${followerCustomId}`);
  };

  if (error) {
    return <div className="text-center text-red-500 font-bold">{error}</div>;
  }

  return (
    <TabProvider>
      <Tab type="followersFollowing" customId={customId} />
      <div className="p-4">
        {followersList.length === 0 ? (
          <div className="text-center text-white font-bold">
            No Followers Found.
          </div>
        ) : (
          <div className="text-white">
            {followersList.map(follower => (
              <div
                key={follower.customId}
                onClick={() => onClickToUserProfile(follower.customId)}
                className="flex items-center gap-x-4 mb-4 cursor-pointer"
              >
                <Image
                  src={follower.profileImage || '/profile.svg'}
                  alt={follower.customId}
                  width={40}
                  height={40}
                  className="bg-slate-300 w-10 h-10 rounded-full"
                />
                <div>
                  <div className="text-white font-bold hover:underline cursor-pointer">
                    {follower.userName}
                  </div>
                  <div className="text-gray-500">@{follower.customId}</div>
                </div>
              </div>
            ))}
          </div>
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
