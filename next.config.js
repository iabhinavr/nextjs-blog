/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wp.abhinavr.com',
        port: '',
        pathname: '/**',
      }
    ]
  }
}

module.exports = nextConfig
