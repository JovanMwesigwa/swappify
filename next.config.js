/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_GOERLI_URL_TESTNET:
      'https://eth-goerli.g.alchemy.com/v2/31xwGooibiMLi_ydKyN_pC06d8WJQjqD',
  },
}

module.exports = nextConfig
