/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/pt-br/inicio",
        permanent: false
      },
      {
        source: "/pt-br/contas-a-pagar",
        destination: "/pt-br/inicio",
        permanent: false
      },
      {
        source: "/en/contas-a-pagar",
        destination: "/en/inicio",
        permanent: false
      }
    ]
  }
}

module.exports = nextConfig
