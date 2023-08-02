/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  experimental: {
    appDir: true
  },
  transpilePackages: ['@acme/ui', 'lodash-es'],
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
