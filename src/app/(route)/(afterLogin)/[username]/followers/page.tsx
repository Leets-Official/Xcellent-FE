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
      } catch (err) {
        console.error('Failed to fetch customId: ', err);
        setError('Failed to fetch user info');
      }
    };

    fetchCustomId();
  }, []);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const data = await getFollowersList(customId, pageNo);
        console.log('customId : ', customId);
        setFollowersList(data.content || []);
        setTotalPages(data.totalPages || 0);
      } catch (err) {
        setError('Failed to fetch followers list.');
      } finally {
        setLoading(false);
      }
    };
    if (customId) {
      fetchFollowers();
    }
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
              <button
                type="button"
                onClick={() => onClickToUserProfile(follower.userName)}
                className="flex items-center gap-x-4 mb-4 cursor-pointer w-full text-left"
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
              </button>
            ))}
          </div>
        )}

        {/* 무한 스크롤로 수정하는게 좋을 듯  */}
        <div className="flex justify-center mt-6">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setPageNo(index + 1)}
              className={`text-white font-bold px-4 py-2 mx-1 rounded ${
                pageNo === index + 1
                  ? 'bg-blue-600'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </TabProvider>
  );
}
