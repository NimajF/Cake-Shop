/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

module.exports = {
  env: {
    BASE_URL:
      "http://localhost:3000" ||
      "https://dulcevictorina.vercel.app" ||
      "https://dulcevictorina-cybs9nl1r-nimajf.vercel.app" ||
      "https://dulcevictorina-git-main-nimajf.vercel.app",
    CLOUD: process.env.CLOUD_URL,
    CLOUD_PRESET: process.env.CLOUD_PRESET_NAME,
    CLOUD_KEY: process.env.CLOUD_API_KEY,
    CLOUD_SECRET: process.env.CLOUD_API_SECRET,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};
