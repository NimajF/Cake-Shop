/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

module.exports = {
  env: {
    CLOUD: process.env.CLOUD_URL,
    CLOUD_PRESET: process.env.CLOUD_PRESET_NAME,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};
