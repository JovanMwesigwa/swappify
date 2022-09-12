import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { Navbar, SwapTab } from '../components'
import { getUniBalance, getWethBalance } from '../utils'
import { getEstimatedPrice } from '../services/AlphaRouter'

const Home: NextPage = () => {
  const [provider, setProvider] = useState<any>(undefined)
  const [signer, setSigner] = useState<any>({})
  const [signerAddress, setSignerAddress] = useState<String | null>('')
  const [tokenFromBalance, setTokenFromBalance] = useState<
    String | undefined | Number
  >(0.0)
  const [tokenToBalance, setTokenToBalance] = useState<
    String | undefined | Number
  >(0.0)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<String>('')

  const [tokenFromAmountEntered, setTokenFromAmountEntered] = useState<any>(0.0)
  const [tokenToAmountEntered, setTokenToAmountEntered] = useState<any>(0.0)

  const [estimatedValue, setEstimatedValue] = useState<Number | undefined>()

  useEffect(() => {
    const onLoad = async () => {
      const newProvider = new ethers.providers.Web3Provider(window.ethereum)
      setProvider(newProvider)
    }

    onLoad()
  }, [])

  const connectWallet = async () => {
    setLoading(true)
    try {
      // Give Metamask permission to connect your user accounts
      await provider.send('eth_requestAccounts', [])

      // Now connect the signer
      const newSigner = await provider.getSigner()
      setSigner(newSigner)

      // Get the signer address
      const address_ = await newSigner.getAddress()
      setSignerAddress(address_)

      const tokenFromBal_ = await getWethBalance(address_, provider)
      const tokenToBal_ = await getUniBalance(address_, provider)

      setTokenFromBalance(tokenFromBal_)
      setTokenToBalance(tokenToBal_)

      setLoading(false)
    } catch (err: any) {
      console.log(err.response)
      setLoading(false)
    }
  }

  const findEstimate = async () => {
    setLoading(true)
    // console.log(signerAddress)
    const response = await getEstimatedPrice(
      tokenFromAmountEntered,
      signerAddress
    )

    setError(response)
    setLoading(false)
  }

  const disconnect = () => {
    setSigner({})
    setSignerAddress('')
  }

  return (
    <div className=" w-full h-full">
      <Head>
        <title>Swappify </title>
        <meta name="description" content="Swap to your favourite asset" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        connect={connectWallet}
        signerAddress={signerAddress}
        disconnect={disconnect}
      />

      <div className="flex flex-1 items-center justify-center">
        <SwapTab
          loading={loading}
          setLoading={setLoading}
          tokenFromBalance={tokenFromBalance}
          tokenToBalance={tokenToBalance}
          setTokenFromAmountEntered={setTokenFromAmountEntered}
          fromValue={tokenFromAmountEntered}
          estimatedValue={estimatedValue}
          // setEstimatedValue={setEstimatedValue}
          findEstimate={findEstimate}
        />
      </div>
      <h4 className="text-sm text-center p-4 bg-pink-100 my-6">
        Due to the upcoming merge, swap pools may be un stable on Goerli testnet
      </h4>
    </div>
  )
}

export default Home
