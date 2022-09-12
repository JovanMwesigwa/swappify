import { AlphaRouter } from '@uniswap/smart-order-router'
import { Token, CurrencyAmount, TradeType, Percent } from '@uniswap/sdk-core'
import { ethers, BigNumber } from 'ethers'
import {tokenData} from '../helper/helper-config'

import JSBI from 'jsbi'

const V3_SWAP_ROUTER_ADDRESS = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45'
const REACT_APP_GOERLI_URL_TESTNET = process.env.REACT_APP_GOERLI_URL_TESTNET

const web3Provider = new ethers.providers.JsonRpcProvider(REACT_APP_GOERLI_URL_TESTNET)

const chainId = 5

const router = new AlphaRouter({ chainId: 1, provider: web3Provider })

const TOKEN_FROM = new Token(chainId, tokenData[0].address, tokenData[0].decimals, tokenData[0].symbol, tokenData[0].name)
const TOKEN_TO = new Token(chainId, tokenData[1].address, tokenData[1].decimals, tokenData[1].symbol, tokenData[1].name)

export const getEstimatedPrice = async(amount: any, signerAdress: any) => {

    try {
        // Convert the amount to wei
        const wei = ethers.utils.parseUnits(amount.toString(), tokenData[0].decimals)
        const wethAmount = CurrencyAmount.fromRawAmount(TOKEN_FROM, JSBI.BigInt(wei));

        const route = await router.route(wethAmount, TOKEN_TO, TradeType.EXACT_INPUT, {
            recipient: signerAdress,
            slippageTolerance: new Percent(5, 100),
            deadline: Math.floor(Date.now() / 1000 + 1800),
        })

        console.log(`Quote Exact In: ${route?.quote.toFixed(2)}`);
        console.log(`Gas Adjusted Quote In: ${route?.quoteGasAdjusted.toFixed(2)}`);
        console.log(`Gas Used USD: ${route?.estimatedGasUsedUSD.toFixed(6)}`);

        return route
    } catch (error: any) {
        console.log(error.message)
        return error.message
    }
}