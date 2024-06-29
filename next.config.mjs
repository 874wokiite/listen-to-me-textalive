/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  env: {
    NEXT_PUBLIC_PLAYER_TOKEN: process.env.NEXT_PUBLIC_PLAYER_TOKEN,
  },
};

export default nextConfig;