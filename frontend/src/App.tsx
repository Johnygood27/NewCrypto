import { useState } from 'react'
import { ethers } from 'ethers'
import { getContract } from './lib/web3'

function App() {
  const [account, setAccount] = useState<string>()

  async function connect() {
    const [addr] = await (window as any).ethereum.request({ method: 'eth_requestAccounts' })
    setAccount(addr)
  }

  async function vote() {
    const contract = await getContract()
    const encoded = "0x" // placeholder for encoded value
    const attestation = "0x"
    await contract.vote(encoded, attestation)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">FHE VoteForge</h1>
      {!account && <button onClick={connect} className="px-4 py-2 bg-blue-600 rounded">Connect</button>}
      {account && <button onClick={vote} className="px-4 py-2 bg-green-600 rounded">Vote</button>}
    </div>
  )
}

export default App
