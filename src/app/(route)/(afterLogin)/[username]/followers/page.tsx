'use client';

import Tab from '@/app/(route)/(afterLogin)/[username]/_component/Tab';
import TabProvider from '@/app/(route)/(afterLogin)/[username]/_component/TabProvider';
import Image from 'next/image';
import { getProfileInfo } from '@/app/api/user/user';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getFollowersList } from '@/app/api/user/follower';
import FollowingButton from '../_component/FollowingButton';

export default function FollowersPage() {
  const router = useRouter();
  const [followersList, setFollowersList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNo, setPageNo] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [customId, setCustomId] = useState<string>('');

  useEffect(() => {
    const fetchCustomId = async () => {
      try {
        const userInfo = await getProfileInfo();
        setCustomId(userInfo.customId);
        console.log('Fetched customId : ', userInfo.customId);
      } catch (err) {
        console.error('Failed to fetch customId: ', err);
        setError('Failed to fetch user info');
      }
    };

    fetchCustomId();
  }, []);

  useEffect(() => {
    const fetchFollowers = async () => {
      if (!customId) return console.log('customId 없음');
      try {
        const data = await getFollowersList(customId, pageNo);
        console.log('customId : ', customId);
        console.log('API Response:', data); // API 응답 로그 출력
        setFollowersList(data.content || []);
        setTotalPages(data.totalPages || 0);
      } catch (err) {
        setError('Failed to fetch followers list.');
        console.error('Error fetching followers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, [customId, pageNo]);

  const onClickToUserProfile = (userName: string) => {
    router.push(`/${userName}`);
  };

  if (error) {
    return <div className="text-center text-red-500 font-bold">{error}</div>;
  }

  if (loading) {
    return (
      <div className="text-center text-white font-bold">
        Loading followers...
      </div>
    );
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
                onClick={() => onClickToUserProfile(follower.userName)}
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
                  <div className="text-white font-bold hover:underline">
                    {follower.userName}
                  </div>
                  <div className="text-gray-500">{follower.customId}</div>
                </div>
                <FollowingButton />
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={() => setPageNo(prev => Math.max(prev - 1, 1))}
            disabled={pageNo === 1}
            className="text-white font-bold px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setPageNo(prev => prev + 1)}
            disabled={pageNo >= totalPages - 1}
            className="text-white font-bold px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </TabProvider>
  );
}
