'use client';

import { useRouter, usePathname } from 'next/navigation';
import BackButton from '@/app/(route)/(afterLogin)/_component/BackButton';
import Tab from './_component/Tab';
import TabProvider from './_component/TabProvider';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProfileInfo } from '@/app/api/user/user';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfileInfo();
        setUser(profileData);
      } catch (error) {
        console.error('Error fetching profile data: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="text-center text-white font-bold">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="text-center text-white font-bold">
        Failed to load profile
      </div>
    );
  }

  const mockData = {
    following: 10,
    followers: 30,
  };

  const pathname = usePathname();

  const router = useRouter();

  const onClickToEditProfileModal = () => {
    router.push(`${pathname}/settings/profile`);
  };

  const onClickToFollowing = () => {
    router.push(`/${user.userName}/following`);
  };
  const onClickToFollowers = () => {
    router.push(`/${user.userName}/followers`);
  };

  return (
    <TabProvider>
      <div className="w-full">
        <div className="relative h-40">
          <Image
            src={user.backgroundProfileImageUrl || '/backgroundImage.jpg'}
            alt="Background Image"
            fill
            className="object-cover w-full h-50 z-0"
          />
        </div>

        <div className="relative z-10 p-4 pt-0">
          <div className="flex items-center gap-8">
            <div className="absolute top-[10%] left-4 transform -translate-y-1/2">
              <Image
                src={user.profileImageUrl || '/profile.svg'}
                alt={user.customId}
                width={150}
                height={150}
                className="bg-slate-300 w-[150px] h-[150px] rounded-full"
              />
            </div>

            <Link href="/settings/profile" className="ml-auto">
              <button
                type="button"
                className="px-4 py-2 font-bold bg-transparent rounded-full text-white border border-white hover:bg-slate-800"
              >
                Edit Profile
              </button>
            </Link>
          </div>

          <div className="mt-20 flex flex-col">
            <div className="text-white font-bold text-xl">{user.userName}</div>
            <div className="text-sm text-gray-500">@{user.customId}</div>
          </div>

          <div className="flex flex-row gap-8 mt-2">
            <Link
              href={`/${user.customId}/followers`}
              className="hover:underline cursor-pointer font-bold text-white"
            >
              {mockData.followers}{' '}
              <span className="text-sm text-gray-500">Followers</span>
            </Link>
            <Link
              href={`/${user.customId}/following`}
              className="hover:underline cursor-pointer font-bold text-white"
            >
              {mockData.following}{' '}
              <span className="text-sm text-gray-500">Following</span>
            </Link>
          </div>

          <Tab type="postsLikes" userName={user.userName} />
        </div>
      </div>
    </TabProvider>
  );
}
