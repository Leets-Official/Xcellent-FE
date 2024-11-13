'use client';

import { useEffect, useState } from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';
import Link from 'next/link';
import { getProfileInfo } from '@/app/api/user/user';
import { AiFillHome } from 'react-icons/ai';
import { RiMailLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';

export default function SideBar() {
  const segment = useSelectedLayoutSegment();
  const [me, setMe] = useState<{ id: string } | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getProfileInfo();
        setMe({ id: userInfo.customId });
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const menuItems = [
    {
      href: '/home',
      label: 'Home',
      segmentKey: 'home',
      icon: <AiFillHome className="w-7 h-7" />,
    },
    {
      href: '/messages',
      label: 'Messages',
      segmentKey: 'messages',
      icon: <RiMailLine className="w-7 h-7" />,
    },
    {
      href: `/${me?.id}`,
      label: 'Profile',
      segmentKey: me?.id,
      icon: <CgProfile className="w-7 h-7" />,
    },
  ];

  return (
    <div className="space-y-4">
      {menuItems.map(({ href, label, segmentKey, icon }) => (
        <div key={href}>
          <Link href={href}>
            <div
              className={`flex items-center gap-4 text-xl px-4 py-3 rounded-full ${
                segment === segmentKey ? 'font-extrabold' : 'hover:bg-gray-800'
              }`}
            >
              {icon}
              <span>{label}</span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
