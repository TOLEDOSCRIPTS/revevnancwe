/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mc-heads.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'crafatar.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
