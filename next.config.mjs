/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // 클라이언트 사이드에서 'fs' 모듈을 사용하지 않도록 설정
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    // 모듈 해석 설정 추가
    config.resolve.modules.push(process.cwd());

    return config;
  },
  // 절대 경로 설정
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
