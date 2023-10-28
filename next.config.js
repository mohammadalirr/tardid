const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // reactStrictMode: false,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  env: {
    MAIN_TITLE: process.env.MAIN_TITLE,
    URL_ENV: process.env.URL_ENV,
    AXIOS_TIMEOUT: process.env.AXIOS_TIMEOUT,
    LOCAL_STORAGE_ACCESS: process.env.LOCAL_STORAGE_ACCESS,
  },
  output: 'standalone'
})
