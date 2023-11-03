/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/pt-br/inicio",
        permanent: false
      }    
    ]
  }
}

module.exports = nextConfig
