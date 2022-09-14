/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_GOERLI_URL_TESTNET:
      'https://eth-goerli.g.alchemy.com/v2/31xwGooibiMLi_ydKyN_pC06d8WJQjqD',
    REACT_APP_MAINNET:
      'https://mainnet.infura.io/v3/ee9d8f30deb743ad8b396e6e16241aa2',
  },
  REACT_APP_ROPSTEN_URL_TESTNET:
    'https://ropsten.infura.io/v3/7c7654b80dab406db34ebd981ac0faeb',
}

module.exports = nextConfig
