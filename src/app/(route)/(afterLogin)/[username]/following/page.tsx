'use client';

import Tab from '@/app/(route)/(afterLogin)/[username]/_component/Tab';
import TabProvider from '@/app/(route)/(afterLogin)/[username]/_component/TabProvider';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProfileInfo } from '@/app/api/user/user';
import { getFollowingList } from '@/app/api/user/following';
import FollowingButton from '../_component/FollowingButton';

export default function FollowingPage() {
  const router = useRouter();
  const [followingList, setFollowingList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNo, setPageNo] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [customId, setCustomId] = useState<string>('');

  // customId와 팔로잉 목록을 한 번에 가져오는 useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        // customId 가져오기
        const userInfo = await getProfileInfo();
        const userCustomId = userInfo.customId;
        setCustomId(userCustomId);

        // 팔로잉 목록 가져오기
        const data = await getFollowingList(userCustomId, pageNo);
        setFollowingList(data.content || []);
        setTotalPages(data.totalPages || 0);
      } catch (err) {
        console.error('Failed to fetch data: ', err);
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageNo]);

  const onClickToUserProfile = () => {
    router.push(`/${customId}`);
  };

  if (error) {
    return <div className="text-center text-red-500 font-bold">{error}</div>;
  }

  if (loading) {
    return (
      <div className="text-center text-white font-bold">
        Loading following...
      </div>
    );
  }

  return (
    <TabProvider>
      <Tab type="followersFollowing" userName={customId} />
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
                onClick={onClickToUserProfile}
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
                <FollowingButton />
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-6">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setPageNo(index + 1)}
              className={`text-white font-bold px-4 py-2 mx-1 rounded ${
                pageNo === index + 1
                  ? 'bg-gray-600'
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
