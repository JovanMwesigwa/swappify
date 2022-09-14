interface Props {
  loading: boolean
  setLoading: any
  tokenFromBalance: String | undefined | Number
  tokenToBalance: String | undefined | Number
  setTokenFromAmountEntered: any
  fromValue: any
  estimatedValue: any
  findEstimate: any
  gasEstimate: any
  setEstimatedValue: any
  clear: any
  swap: any
  setShowModal: (take: boolean) => void
}

const SwapTab: React.FC<Props> = ({
  loading,
  setLoading,
  tokenFromBalance,
  tokenToBalance,
  setTokenFromAmountEntered,
  fromValue,
  estimatedValue,
  findEstimate,
  gasEstimate,
  swap,
  clear,
  setShowModal,
}) => {
  return (
    <div className="h-1/2 w-full md:w-1/3 mx-3 bg-white p-8 rounded-lg shadow-sm">
      <div className="w-full px-3 flex flex-row items-center justify-between">
        <h3 className="text-xl font-medium">Swap</h3>
        <h3 className="text-xl font-medium">Settings</h3>
      </div>

      <div className="flex flex-1 flex-col my-6">
        <div className="flex flex-row items-center my-3 justify-between w-full py-3 bg-blue-50">
          <input
            placeholder="0.0"
            className="bg-blue-50 rounded-md p-2 w-full outline-none px-4"
            value={fromValue}
            onChange={(e) => setTokenFromAmountEntered(e.target.value)}
            onFocus={clear}
          />
          <div
            onClick={() => setShowModal(true)}
            className="px-10 cursor-pointer"
          >
            <h1 className="text-xl font-medium">WETH</h1>
            <p className="text-xs">
              <>{tokenFromBalance ? tokenFromBalance : 0.0}</>
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center my-3 justify-between w-full py-3 bg-blue-50">
          {loading ? (
            <div className="bg-blue-50 rounded-md py-3 w-full outline-none px-4">
              <p>....</p>
            </div>
          ) : (
            <>
              <input
                placeholder="0.0"
                className="bg-blue-50 rounded-md p-2 w-full outline-none px-4"
                value={estimatedValue && estimatedValue}
                readOnly={true}
              />
              <div
                onClick={() => setShowModal(true)}
                className="px-10 cursor-pointer"
              >
                <h1 className="text-xl font-medium">UNI</h1>
                {/* <p className="text-xs">
                  <>{tokenToBalance ? tokenToBalance : 0.0}</>
                </p> */}
                <p className="text-xs">
                  <>{estimatedValue ? estimatedValue : 0.0}</>
                </p>
              </div>
            </>
          )}
        </div>
        {gasEstimate > 0 && <p className="text-xs">Gas: {gasEstimate} USD</p>}
        {!estimatedValue ? (
          <button
            onClick={findEstimate}
            className="flex flex-row items-center my-3 justify-center w-full py-3 bg-blue-100 border-2 border-pink-700 rounded-md"
          >
            <h1 className="text-center text-pink-700">Estimate</h1>
          </button>
        ) : (
          <button
            onClick={swap}
            className="flex flex-row items-center my-3 justify-center w-full py-3 bg-pink-700 rounded-md"
          >
            <h1 className="text-center text-white">Swap</h1>
          </button>
        )}
      </div>
    </div>
  )
}

export default SwapTab
