import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import Image from 'next/image'

interface Props {
  handleClose: () => void
  handleShow: () => void
  showModal: boolean
}

const TokenModal: React.FC<Props> = ({
  showModal,
  handleClose,
  handleShow,
}) => {
  const [tokens, setTokens] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    fetchTokens()
  }, [])

  const fetchTokens = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        'https://tokens.coingecko.com/uniswap/all.json'
      )
      const data = response.data
      setTokens(data.tokens)
      console.log(data.tokens[0])
      setLoading(false)
    } catch (err: any) {
      console.log(err.message)
      setLoading(false)
    }
  }
  return (
    <>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Select a token</Modal.Title>
        </Modal.Header>
        <>
          {loading ? (
            <p>......</p>
          ) : (
            <>
              <Modal.Body>
                {tokens.map((token: any) => (
                  <div
                    key={token.address}
                    className="w-full h-14 flex flex-row justify-between my-4 cursor-pointer hover:bg-gray-50"
                  >
                    <div className="h-full w-14 bg-slate-400 rounded-full relative ">
                      <Image src={token.logoURI} layout="fill" />
                    </div>
                    <div className="flex flex-col flex-1 mx-4">
                      <h1 className="text-xl">{token.name}</h1>
                      <p>{token.symbol}</p>
                    </div>
                    <div className="flex flex-col">
                      <h1 className="text-xl">{token.symbol}</h1>
                    </div>
                  </div>
                ))}
              </Modal.Body>
            </>
          )}
        </>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={fetchTokens}>
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default TokenModal
