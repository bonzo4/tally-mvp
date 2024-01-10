/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/davidjerleke/embla-carousel/**",
      },
      {
        protocol: "https",
        hostname: "bxjsuelhllhggaosiovg.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "/avatars/**",
      },
      {
        protocol: "https",
        hostname: "beehiiv-images-production.s3.amazonaws.com",
        port: "",
        pathname: "/uploads/asset/file/**",
      },
    ],
  },
};

module.exports = nextConfig;
