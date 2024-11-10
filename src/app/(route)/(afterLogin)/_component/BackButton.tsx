'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="hover:bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="fill-white r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03 r-1otekoa"
      >
        <g>
          <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
        </g>
      </svg>
    </button>
  );
}
