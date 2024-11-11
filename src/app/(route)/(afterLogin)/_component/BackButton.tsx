'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="hover:bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center"
    >
      <Image
        src="/backButton.svg"
        alt="Back"
        unoptimized
        width={24}
        height={24}
      />
    </button>
  );
}
