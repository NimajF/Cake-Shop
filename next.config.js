/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

module.exports = {
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    CLOUD: process.env.CLOUD_URL,
    CLOUD_PRESET: process.env.CLOUD_PRESET_NAME,
    CLOUD_KEY: process.env.CLOUD_API_KEY,
    CLOUD_SECRET: process.env.CLOUD_API_SECRET,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};
