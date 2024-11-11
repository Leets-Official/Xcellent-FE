'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import Link from 'next/link';

export default function SideBar() {
  const segment = useSelectedLayoutSegment();
  const me = {
    id: 'dahyeon',
  };

  const menuItems = [
    { href: '/home', label: 'Home', segmentKey: 'home' },
    { href: '/messages', label: 'Messages', segmentKey: 'messages' },
    { href: `/${me.id}`, label: 'Profile', segmentKey: me.id },
  ];

  return (
    <nav className="flex-1">
      <ul className="space-y-4">
        {menuItems.map(({ href, label, segmentKey }) => (
          <li key={href}>
            <Link href={href}>
              <div
                className={`flex items-center gap-4 text-xl px-4 py-3 rounded-full ${
                  segment === segmentKey
                    ? 'font-extrabold'
                    : 'hover:bg-gray-800'
                }`}
              >
                <span>{label}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
