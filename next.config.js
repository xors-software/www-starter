/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 'cdn.center.app',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'nft-cdn.alchemy.com',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'i.seadn.io',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'cloudflare-ipfs.com',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'gateway.pinata.cloud',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'openseauserdata.com',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'storage.googleapis.com',
      // },
      // {
      //   protocol: 'https',
      //   hostname: '**.googleusercontent.com',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'ipfs.io',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'res.cloudinary.com',
      // },
    ],
  },
}

module.exports = nextConfig