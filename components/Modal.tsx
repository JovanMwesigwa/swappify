import React from 'react'

import { tokenData } from '../helper/helper-config'

interface Props {
  setShowModal: (take: boolean) => void
  showModal: boolean
}

const Modal: React.FC<Props> = ({ showModal, setShowModal }) => {
  return (
    <div onClick={() => setShowModal(false)}>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">Select your token</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative py-6 flex-auto">
                  {tokenData.map((token: any) => (
                    <div
                      key={token.address}
                      className="flex flex-1 flex-col my-4 border-b-2 px-3 py-3 cursor-pointer border-grey-100"
                    >
                      <h1 className="text-lg font-medium">{token.name}</h1>
                      <p>{token.symbol}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  )
}

export default Modal
