import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-row justify-around items-center mt-40">
      <div>
        <svg
          width="400"
          height="400"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="fill-white r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-rxcuwo r-1777fci r-m327ed r-494qqr"
        >
          <g>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </g>
        </svg>
      </div>
      <div className="flex flex-col justify-end gap-y-7 font-bold ">
        <p className="text-6xl font-bold text-white mb-50px">
          지금 일어나고 있는 일
        </p>
        <p className="text-4xl font-bold text-white">지금 가입하세요.</p>
        <p className="font-bold text-white">
          ㅡㅡㅡㅡㅡㅡㅡ 또는 ㅡㅡㅡㅡㅡㅡㅡ
        </p>
        <Link
          href="/i/flow/signup"
          className="bg-sky-500 rounded-3xl text-center text-white px-5 py-2.5 font-bold w-1/2 h-10 me-5"
        >
          계정 만들기
        </Link>
        <p className="text-zinc-400 font-sm">
          가입하시려면 쿠키 사용을 포함해 이용약관과 개인정보 처리
          <br /> 방침에 동의해야 합니다.
        </p>
        <h3 className="text-white">이미 트위터에 가입하셨나요?</h3>
        <Link
          href="/login"
          className="border-solid border-2 border-sky-500 rounded-3xl text-sky-500 text-center font-bold  px-5 py-2 w-1/2 h-10 me-5"
        >
          로그인
        </Link>
      </div>
    </div>
  );
}
