/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "personafumes-development.s3.amazonaws.com",
      "personafumes.s3.me-south-1.amazonaws.com",
      "t3.ftcdn.net",
    ],
  },

  webpack(config, { isServer }) {
    // Allow importing of shader files (e.g. `.glsl` -- filenames below)
    // @see: https://github.com/glslify/glslify-loader
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag|ps)$/,
      exclude: /node_modules/,
      use: ["raw-loader", "glslify-loader"],
    });

    return config;
  },

  // Internationalized Routing
  // @see: https://nextjs.org/docs/advanced-features/i18n-routing
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
};

const withVideos = require("next-videos");
// const nodeExternals = require("webpack-node-externals");

module.exports = withVideos({
  assetPrefix: "https://personafumes.s3.me-south-1.amazonaws.com",
  trailingSlash: true,

  webpack(config, options) {
    return config;
  },
});

// module.exports = plugins(nextConfig);

module.exports = nextConfig;
