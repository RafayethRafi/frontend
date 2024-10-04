module.exports = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback.fs = false;
      }
      return config;
    },
  };



// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ['your-api-domain.com'], // Replace with your actual API domain
//   },
// }

// module.exports = nextConfig