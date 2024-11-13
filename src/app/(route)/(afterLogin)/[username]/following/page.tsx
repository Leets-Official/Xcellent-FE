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

        const data = await getFollowingList(customId, pageNo);
        const newFollowing = data.content || [];

        const updatedList = [
          ...followingList,
          ...newFollowing.filter(
            newFollow =>
              !followingList.some(
                existingFollow =>
                  existingFollow.customId === newFollow.customId,
              ),
          ),
        ];

        setFollowingList(updatedList);
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

  const onClickToUserProfile = (followingCustomId: string) => {
    router.push(`/${followingCustomId}`);
  };

  if (error) {
    return <div className="text-center text-red-500 font-bold">{error}</div>;
  }

  return (
    <TabProvider>
      <Tab type="followersFollowing" customId={customId} />
      <div className="p-4">
        {followingList.length === 0 ? (
          <div className="text-center text-white font-bold">
            No Following Found.
          </div>
        ) : (
          <div className="text-white">
            {followingList.map(following => (
              <div
                key={following.customId}
                onClick={() => onClickToUserProfile(following.customId)}
                className="flex items-center gap-x-4 mb-4 cursor-pointer"
              >
                <Image
                  src={following.profileImage || '/profile.svg'}
                  alt={following.customId}
                  width={40}
                  height={40}
                  className="bg-slate-300 w-10 h-10 rounded-full"
                />
                <div>
                  <div className="text-white font-bold hover:underline cursor-pointer">
                    {following.userName}
                  </div>
                  <div className="text-gray-500">{following.customId}</div>
                </div>
                <FollowingButton
                  isFollowing={following.isFollowing}
                  onFollow={() => console.log('Follow clicked')}
                  onUnfollow={() => console.log('Unfollow clicked')}
                />
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
