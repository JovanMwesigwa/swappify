interface Props {
  loading: boolean
  setLoading: any
  tokenFromBalance: String | undefined | Number
  tokenToBalance: String | undefined | Number
  setTokenFromAmountEntered: any
  fromValue: any
  estimatedValue: Number | undefined
  findEstimate: any
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
}) => {
  return (
    <div className="h-1/2 w-1/3 bg-white p-8 rounded-lg shadow-sm">
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
          />
          <div className="px-10">
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
              />
              <div className="px-10">
                <h1 className="text-xl font-medium">UNI</h1>
                <p className="text-xs">
                  <>{tokenToBalance ? tokenToBalance : 0.0}</>
                </p>
              </div>
            </>
          )}
        </div>
        {!estimatedValue ? (
          <button
            onClick={findEstimate}
            className="flex flex-row items-center my-3 justify-center w-full py-3 bg-blue-100 border-2 border-pink-700 rounded-md"
          >
            <h1 className="text-center text-pink-700">Estimate</h1>
          </button>
        ) : (
          <button className="flex flex-row items-center my-3 justify-center w-full py-3 bg-pink-700 rounded-md">
            <h1 className="text-center text-white">Swap</h1>
          </button>
        )}
      </div>
    </div>
  )
}

export default SwapTab
