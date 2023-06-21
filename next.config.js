/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  experimental: {
    appDir: true,
  },
  transpilePackages: ['@acme/ui', 'lodash-es'],
}

module.exports = nextConfig
