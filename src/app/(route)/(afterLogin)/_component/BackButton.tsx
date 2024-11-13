'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import BackButtonImg from '../../../../../public/backButton.svg';

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
        width={36}
        height={36}
        className="w-[36px] h-[36px]"
      />
      {/* <BackButtonImg className="w-8 h-8" /> */}
    </button>
  );
}
