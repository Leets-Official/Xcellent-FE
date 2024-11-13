'use client';

import Tab from '@/app/(route)/(afterLogin)/[username]/_component/Tab';
import TabProvider from '@/app/(route)/(afterLogin)/[username]/_component/TabProvider';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getProfileInfo } from '@/app/api/user/user';
import { getFollowersList } from '@/app/api/user/follower';
import FollowingButton from '../_component/FollowingButton';

export default function FollowersPage() {
  const router = useRouter();
  const [followersList, setFollowersList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pageNo, setPageNo] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [customId, setCustomId] = useState<string>('');
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (loading || !hasMore) return;
      try {
        setLoading(true);

        const userInfo = await getProfileInfo();
        const userCustomId = userInfo.customId;
        setCustomId(userCustomId);

        const data = await getFollowersList(userCustomId, pageNo);
        setFollowersList(prev => [...prev, ...(data.content || [])]);
        setTotalPages(data.totalPages || 0);

        if (pageNo >= totalPages) {
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
  }, [pageNo]);

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

  const onClickToUserProfile = (id: string) => {
    router.push(`/${id}`);
  };

  if (error) {
    return <div className="text-center text-red-500 font-bold">{error}</div>;
  }

  return (
    <TabProvider>
      <Tab type="followersFollowing" userName={customId} />
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
                  <div className="text-gray-500">{follower.customId}</div>
                </div>
                <FollowingButton />
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
