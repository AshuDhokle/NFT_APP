'use client'
import { Web3Context } from '@/Context/Web3Context'
import formatWalletString from '@/utils/formatWalletString'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import React, {useEffect} from 'react'
import { useContext } from 'react'
import { MdOutlineVerifiedUser } from "react-icons/md";
import { useAccount } from 'wagmi'

const Navbar = () => {
  const {isWalletConnected, connectContract, wallet, isAccountWhitelisted} = useContext(Web3Context)
  const {address, isConnected} = useAccount();
  useEffect(()=>{
    if(address)
      connectContract(address)
  },[address])
  return (
    <div className='p-2 flex flex-row items-center justify-between border-b-2 border-black'>
      <h1 className='text-xl font-bold text-cyan-500 cursor-pointer'>Suprabhat__Mitro</h1>
      <div className='flex flex-row items-center'>
      {
        isAccountWhitelisted && <MdOutlineVerifiedUser className='mr-2 size-6 text-green-500'/>
      } 
      <ConnectButton/>
      </div>
    </div>
  )
}

export default Navbar