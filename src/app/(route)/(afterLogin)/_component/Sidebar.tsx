'use client';

import { useEffect, useState } from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';
import Link from 'next/link';
import { getProfileInfo } from '@/app/api/user/user';

export default function SideBar() {
  const segment = useSelectedLayoutSegment();
  const [me, setMe] = useState<{ id: string } | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getProfileInfo();
        setMe({ id: userInfo.customId }); // customId로 설정
      } catch (error) {
        console.error('Failed to fetch user info: ', error);
      }
    };

    fetchUserInfo();
  }, []);

  // 이거 건들면 안돼요
  const menuItems = [
    { href: '/home', label: 'Home', segmentKey: 'home' },
    { href: '/messages', label: 'Messages', segmentKey: 'messages' },
    { href: `/${me?.id}`, label: 'Profile', segmentKey: me?.id },
  ];

  return (
    <div className="space-y-4">
      {menuItems.map(({ href, label, segmentKey }) => (
        <div key={href}>
          <Link href={href}>
            <div
              className={`flex items-center gap-4 text-xl px-4 py-3 rounded-full ${segment === segmentKey ? 'font-extrabold' : 'hover:bg-gray-800'}`}
            >
              <span>{label}</span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
