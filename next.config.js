/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'avatar.vercel.sh']
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  },
  headers: [
    // Allow for specific domains to have access or * for all
    {
      key: 'Access-Control-Allow-Origin',
      value: '*'
      // DOES NOT WORK
      // value: process.env.ALLOWED_ORIGIN,
    },
    // Allows for specific methods accepted
    {
      key: 'Access-Control-Allow-Methods',
      value: 'GET, POST, PUT, DELETE, OPTIONS'
    },

    {
      key: 'Access-Control-Allow-Headers',
      value: '*'
    }
  ]
};

module.exports = nextConfig;
