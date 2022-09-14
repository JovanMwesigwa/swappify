interface Props {
  connect: any
  signerAddress: String | null
  disconnect: () => void
}

const Navbar: React.FC<Props> = ({ connect, signerAddress, disconnect }) => {
  return (
    <nav className="w-full h-20 flex flex-row items-center justify-between px-4 md:px-20">
      <div className="flex flex-1">
        <h1 className="text-2xl text-pink-400">Swappify</h1>
      </div>
      <div>
        {signerAddress ? (
          <button
            onClick={disconnect}
            className="px-6 py-1 text-lg border-pink-700 border-4 text-pink-700 bg-pink-200 rounded-full"
          >
            {signerAddress.substring(0, 6)}
          </button>
        ) : (
          <button
            onClick={connect}
            className="px-6 py-1 text-lg border-pink-700 border-4 text-pink-700 bg-pink-200 rounded-full"
          >
            Connect
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
