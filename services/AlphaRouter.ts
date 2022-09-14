import { AlphaRouter } from '@uniswap/smart-order-router'
import { Token, CurrencyAmount, TradeType, Percent } from '@uniswap/sdk-core'
import { ethers, BigNumber } from 'ethers'
import {tokenData} from '../helper/helper-config'
import ERC20_ABI from '../artifacts/abi.json' 

import JSBI from 'jsbi'


const V3_SWAP_ROUTER_ADDRESS = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45'
// const REACT_APP_GOERLI_URL_TESTNET = process.env.REACT_APP_GOERLI_URL_TESTNET
const REACT_APP_GOERLI_URL_TESTNET = process.env.REACT_APP_MAINNET
// const REACT_APP_URL_TESTNET = process.env.REACT_APP_ROPSTEN_URL_TESTNET

const web3Provider = new ethers.providers.JsonRpcProvider(REACT_APP_GOERLI_URL_TESTNET)

const chainId = 1

const router = new AlphaRouter({ chainId: chainId, provider: web3Provider })

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

        console.log(route)
        console.log(`Quote Exact In: ${route?.quote?.toFixed(2)}`);
        console.log(`Gas Adjusted Quote In: ${route?.quoteGasAdjusted?.toFixed(2)}`);
        console.log(`Gas Used USD: ${route?.estimatedGasUsedUSD?.toFixed(6)}`);

        return route
    } catch (error: any) {
        console.log(error.message)
        return error.message
    }
}

export const makeSwap = async(route: any, signer: any) => {
    try {
        // First approve uniswap to swap from your contract
        const tokenFromContract = new ethers.Contract(tokenData[0].address, ERC20_ABI, signer)
        const tx = await tokenFromContract.connect(signer).approve(
            V3_SWAP_ROUTER_ADDRESS,
            ethers.utils.parseUnits("1",tokenData[0].decimals)
        )
        await tx.wait(1)
        console.log('Approved!')

        const MY_ADDRESS = await signer.getAddress()
        console.log(MY_ADDRESS)
        const transaction: any = {
            data: route.methodParameters.calldata,
            to: V3_SWAP_ROUTER_ADDRESS,
            value: BigNumber.from(route.methodParameters.value),
            from: MY_ADDRESS,
            gasPrice: BigNumber.from(route.gasPriceWei),
          };

        await web3Provider.sendTransaction(transaction);
          console.log('Done!')
    } catch (error: any) {
        console.log(error.message)
    }
}