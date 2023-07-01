/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  experimental: {
    appDir: true,
  },
  transpilePackages: ['@acme/ui', 'lodash-es'],
}

module.exports = nextConfig
