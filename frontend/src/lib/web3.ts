import { ethers } from 'ethers'
import FHEBallot from '../../artifacts/contracts/FHEBallot.sol/FHEBallot.json'

export async function getContract() {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum)
  await provider.send('eth_requestAccounts', [])
  const signer = provider.getSigner()
  const address = (import.meta as any).env.VITE_BALLOT_ADDRESS as string
  return new ethers.Contract(address, FHEBallot.abi, signer)
}
