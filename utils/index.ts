import { ethers } from 'ethers'
import ERC20_ABI from '../artifacts/abi.json' 
import { tokenData } from '../helper/helper-config'


export const getWethContract = async(provider: any) => new ethers.Contract(tokenData[0].address, ERC20_ABI, provider) 
export const getUniContract = async(provider: any) => new ethers.Contract(tokenData[1].address, ERC20_ABI, provider) 


export const getWethBalance = async(signerAddress: any, provider: any) => {
    
    try {
        const wethContract = await getWethContract(provider)

        const balance = await wethContract.balanceOf(signerAddress)

        return Number(ethers.utils.formatEther(balance))
        
    } catch (error: any) {
        console.log(error.message)
    }
}

export const getUniBalance = async(signerAddress: any, provider: any) => {
    try {
        const uniContract = await getUniContract(provider)

        const balance = await uniContract.balanceOf(signerAddress)

        return Number(ethers.utils.formatEther(balance))
        
    } catch (error: any) {
        console.log(error.message)
    }
}