/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "firebasestorage.googleapis.com", 
      "scontent.cdninstagram.com"
    ],
  },
};

module.exports = nextConfig
